import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
   plugins: [
      react(),
      // federation({
      //    name: "remote-app",
      //    filename: "remoteEntry.js",
      //    // Modules to expose
      //    exposes: {
      //       "./Announcement": "./src/Widget/Announcements/Vertical",
      //    },
      //    shared: ["react"],
      // }),
   ],
   define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
   },
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
   build: {
      target: "esnext",
      lib: {
         entry: resolve(__dirname, "lib/index.tsx"),
         formats: ["es"],
      },
      rollupOptions: {},
   },
});
