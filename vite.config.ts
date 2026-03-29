import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import { gridlandWebPlugin } from "@gridland/web/vite-plugin"

/**
 * The @gridland/web dist bundle declares a local `var process = { env: {} }`
 * polyfill (line 1 of dist/index.js). This shadows the global `process` and
 * prevents Vite's `define` from replacing `process.env.NODE_ENV` — the
 * replacement is AST-aware and skips locally-scoped identifiers.
 *
 * Without NODE_ENV being "production", react-reconciler's CJS entry picks
 * the *development* build, whose act() guard and initialization path crash
 * in the browser, producing a blank page.
 *
 * Fix: rewrite the polyfill line to include NODE_ENV so the downstream
 * conditionals resolve correctly at runtime.
 */
function fixGridlandProcessEnv(): Plugin {
  return {
    name: "fix-gridland-process-env",
    enforce: "pre",
    transform(code, id) {
      if (!id.includes("@gridland/web/dist/index.js")) return
      return code.replace(
        'if (typeof process === "undefined") var process = { env: {} };',
        'if (typeof process === "undefined") var process = { env: { NODE_ENV: "production" } };',
      )
    },
  }
}

export default defineConfig({
  plugins: [gridlandWebPlugin(), react(), fixGridlandProcessEnv()],
  build: {
    target: "esnext",
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
  },
})
