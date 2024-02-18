import React from "react";
import "construct-style-sheets-polyfill";
import { twind, cssom, observe } from "@twind/core";
import config from "../twind.config";
import { Index } from "@/Widget/Index";
import { createRoot } from "react-dom/client";
import YesOrNo from "@/Widget/Questions/YesOrNo";
async function HolyWidget(params: { user: any; userId: string; apiKey: string; darkMode?: boolean }) {
   const sheet = cssom(new CSSStyleSheet());
   const tw = twind(config, sheet);

   const widget = document.createElement("div");
   const shadowRoot = widget.attachShadow({ mode: "open" });

   shadowRoot.adoptedStyleSheets = [sheet.target];

   observe(tw, shadowRoot);
   document.body.appendChild(widget);

   createRoot(widget.shadowRoot as ShadowRoot).render(
      <React.StrictMode>
         <Index {...params} />
      </React.StrictMode>
   );
}

(window as any).YesOrNo = YesOrNo;

(window as any).HolyWidget = HolyWidget;
