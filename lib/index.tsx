import React from "react";
import "construct-style-sheets-polyfill";
import { twind, cssom, observe } from "@twind/core";
import config from "../twind.config";
import { Index } from "@/Widget/Index";
import { createRoot } from "react-dom/client";

async function HolyWidget(params) {
   const sheet = cssom(new CSSStyleSheet());
   const tw = twind(config, sheet);

   const widget = document.createElement("div");
   const shadowRoot = widget.attachShadow({ mode: "open" });

   shadowRoot.adoptedStyleSheets = [sheet.target];

   observe(tw, shadowRoot);
   document.body.appendChild(widget);

   createRoot(widget.shadowRoot).render(
      <React.StrictMode>
         <Index {...params} />
      </React.StrictMode>
   );
}

(window as any).HolyWidget = HolyWidget;
