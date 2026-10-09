// cmm.dev edge handler. Static assets do the real work; this only adds what
// agents ask for: Markdown negotiation on "/", and Markdown or JSON 404s for non-browsers.
// Runs before assets only for "/" (see run_worker_first in wrangler.jsonc);
// every other path reaches here only when no asset matched.

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> }
}

const MARKDOWN = "text/markdown; charset=utf-8"

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const accept = request.headers.get("accept") ?? ""

    if (url.pathname === "/") {
      if (accept.includes("text/markdown")) {
        // llms.txt is already the Markdown rendering of the homepage.
        const md = await env.ASSETS.fetch(new Request(new URL("/llms.txt", url)))
        return new Response(md.body, {
          status: md.status,
          headers: { "content-type": MARKDOWN, vary: "Accept" },
        })
      }
      const html = await env.ASSETS.fetch(request)
      const headers = new Headers(html.headers)
      headers.set("vary", "Accept")
      return new Response(html.body, { status: html.status, headers })
    }

    const res = await env.ASSETS.fetch(request)
    if (res.status !== 404 || accept.includes("text/html")) return res
    if (accept.includes("text/markdown")) {
      return new Response(
        `# Not found\n\nNo resource at ${url.pathname}.\n\nSee [llms.txt](https://cmm.dev/llms.txt) for the list of pages, or [sitemap.xml](https://cmm.dev/sitemap.xml).\n`,
        { status: 404, headers: { "content-type": MARKDOWN, vary: "Accept" } },
      )
    }
    return Response.json(
      {
        error: {
          code: "not_found",
          message: `No resource at ${url.pathname}`,
          hint: "See https://cmm.dev/llms.txt for the list of pages.",
        },
      },
      { status: 404 },
    )
  },
}
