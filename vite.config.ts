import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
   build: {
      lib: {
         entry: resolve(__dirname, "lib/index.tsx"),
         formats: ["es"],
      },
      rollupOptions: {
         external: ["react", "react/jsx-runtime"],
      },
   },
});
