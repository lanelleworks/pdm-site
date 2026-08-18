import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// GitHub Pages hosts under /pdm-site/ — set as base so all asset URLs resolve.
// When we move to the real custom domain (putradekamandiri.com), change this to "/".
export default defineConfig({
  base: "/pdm-site/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
