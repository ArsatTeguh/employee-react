import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  optimizeDeps: {
    include: ["lodash", "axios", "react-icons"],
  },
  server: {
    port: 3000,
  },
  build: {
    // outDir: "dist",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
          if (id.includes("src/Components/")) {
            return "components";
          }
          if (id.includes("src/Pages/")) {
            return "pages";
          }
          if (id.includes("src/Route/")) {
            return "Route";
          }
          if (id.includes("src/Common/")) {
            return "common";
          }
        },
      },
    },
  },
});
