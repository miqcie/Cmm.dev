import { describe, expect, test } from "bun:test"
import worker from "../worker"

// Fake asset store: "/" and "/llms.txt" exist, everything else is 404.
const files: Record<string, [string, string]> = {
  "/": ["<!doctype html><h1>cmm.dev</h1>", "text/html"],
  "/llms.txt": ["# cmm.dev\n\nChris McConnell", "text/plain"],
}
const env = {
  ASSETS: {
    async fetch(req: Request) {
      const hit = files[new URL(req.url).pathname]
      if (!hit) return new Response(null, { status: 404 })
      return new Response(hit[0], { headers: { "content-type": hit[1] } })
    },
  },
}
const get = (path: string, accept?: string) =>
  worker.fetch(new Request("https://cmm.dev" + path, { headers: accept ? { accept } : {} }), env)

describe("/", () => {
  test("Accept: text/markdown gets llms.txt as Markdown with Vary: Accept", async () => {
    const res = await get("/", "text/markdown")
    expect(res.status).toBe(200)
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8")
    expect(res.headers.get("vary")).toBe("Accept")
    expect(await res.text()).toStartWith("# cmm.dev")
  })
  test("Accept: text/html gets HTML with Vary: Accept", async () => {
    const res = await get("/", "text/html,*/*;q=0.8")
    expect(res.headers.get("content-type")).toBe("text/html")
    expect(res.headers.get("vary")).toBe("Accept")
    expect(await res.text()).toContain("<h1>")
  })
  test("no Accept header gets HTML", async () => {
    expect((await get("/")).headers.get("content-type")).toBe("text/html")
  })
})

describe("404", () => {
  test("non-browser client gets JSON error", async () => {
    const res = await get("/nope", "application/json")
    expect(res.status).toBe(404)
    expect(res.headers.get("content-type")).toContain("application/json")
    const body = await res.json()
    expect(body.error.code).toBe("not_found")
    expect(body.error.message).toContain("/nope")
    expect(body.error.hint).toContain("llms.txt")
  })
  test("browser keeps the asset 404 untouched", async () => {
    const res = await get("/nope", "text/html")
    expect(res.status).toBe(404)
    expect(res.headers.get("content-type")).toBeNull()
  })
  test("existing asset passes through", async () => {
    expect((await get("/llms.txt", "*/*")).status).toBe(200)
  })
})
