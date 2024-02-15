import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { install } from "@twind/core";
// import config from "../twind.config.js";
import presetAutoprefix from "@twind/preset-autoprefix";
import presetTailwind from "@twind/preset-tailwind";
// activate twind - must be called at least once
// You must call install at least once, but can call it multiple times
install(
   {
      /* config */
      presets: [presetAutoprefix(), presetTailwind()],
   },
   true
);

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);
