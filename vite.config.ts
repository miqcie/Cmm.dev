import { defineConfig } from "vite"

export default defineConfig({
  build: {
    target: "esnext",
    rollupOptions: {
      input: ["index.html", "about.html", "contact.html", "privacy.html", "work.html", "demo/model-picker/index.html", "demo/agent-access/index.html"],
    },
  },
})
