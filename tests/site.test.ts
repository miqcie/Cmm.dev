// Checks the built site in dist/. Run `bun run build` first (CI does).
import { describe, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"

const read = (p: string) => readFileSync("dist/" + p, "utf8")
const text = (html: string) =>
  html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()

test("dist exists", () => expect(existsSync("dist/index.html")).toBe(true))

describe("homepage metadata", () => {
  const html = read("index.html")
  test.each([
    '<html lang="en">',
    '<link rel="canonical" href="https://cmm.dev/"',
    '<meta property="og:type"',
    '<meta property="og:image"',
    '"@type": "Person"',
    "<h1",
  ])("has %s", (needle) => expect(html).toContain(needle))
  test("title names the person, not only the domain", () => {
    expect(html).toMatch(/<title>[^<]*Chris McConnell[^<]*<\/title>/)
  })
  test("500+ characters of real text without JavaScript", () => {
    expect(text(html).length).toBeGreaterThan(500)
  })
})

describe("trust anchor pages", () => {
  test.each(["about", "contact", "privacy"])("/%s has 500+ characters and an h1", (page) => {
    const html = read(page + ".html")
    expect(html).toContain("<h1")
    expect(html).toContain(`<link rel="canonical" href="https://cmm.dev/${page}"`)
    expect(text(html).length).toBeGreaterThan(500)
  })
})

describe("machine-readable files", () => {
  test("robots.txt allows all and names the sitemap", () => {
    const robots = read("robots.txt")
    expect(robots).toContain("User-agent: *\nAllow: /")
    expect(robots).toContain("Sitemap: https://cmm.dev/sitemap.xml")
  })
  test("sitemap lists every page with lastmod", () => {
    const xml = read("sitemap.xml")
    expect(xml).toStartWith('<?xml version="1.0" encoding="UTF-8"?>')
    expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
    for (const loc of ["/", "/about", "/contact", "/privacy", "/viz/", "/viz/messi-from-the-spot/"]) {
      expect(xml).toContain(`<loc>https://cmm.dev${loc}</loc>`)
    }
    const urls = xml.match(/<url>/g)?.length
    expect(xml.match(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g)?.length).toBe(urls)
  })
  test("llms.txt says when to use the site", () => {
    expect(read("llms.txt")).toContain("## When to use this site")
  })
})
