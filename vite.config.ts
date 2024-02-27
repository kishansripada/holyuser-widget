import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
   plugins: [react(), dts({ insertTypesEntry: true, include: ["src/lib/**/*"] })],
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
         entry: resolve(__dirname, "src/lib/index.tsx"),
         formats: ["es"],
         // name: "HolyWidget",
      },
      rollupOptions: {
         // external: ["react", "react/jsx-runtime"],
         // output: {
         //    globals: {
         //       react: "React",
         //       "react-dom": "ReactDOM",
         //    },
         // },
      },
   },
});
