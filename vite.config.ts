import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
   plugins: [
      react(),
      federation({
         name: "remote-app",
         filename: "remoteEntry.js",
         // Modules to expose
         exposes: {
            "./YesOrNo": "./src/Widget/Questions/YesOrNo",
            "./HolyWidget": "./lib/index",
         },
         shared: ["react", "react-dom"],
      }),
   ],
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
   // build: {
   //    lib: {
   //       entry: resolve(__dirname, "lib/index.tsx"),
   //       formats: ["es", "cjs"],
   //    },
   //    rollupOptions: {
   //       external: ["react", "react/jsx-runtime"],
   //    },
   // },
   build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
   },
});
