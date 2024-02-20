import React from "react";
import "construct-style-sheets-polyfill";
import { twind, cssom, observe } from "@twind/core";
import config from "../../twind.config";
import { Embed } from "@/Widget/Embed";
import { createRoot } from "react-dom/client";
import YesOrNo from "@/Widget/ShouldShow/Modal/ConsistentPadding/WidgetContents/Questions/YesOrNo";
import VerticalAnnouncement from "@/Widget/ShouldShow/Modal/ConsistentPadding/WidgetContents/Announcements/Vertical";
import Container from "@/Widget/ShouldShow/Modal/ConsistentPadding/Container";
import ModalWrapper from "@/Widget/ShouldShow/Modal/ModalWrapper";
import { create } from "zustand";

interface Store {
   visiblityMap: {};
   setVisibilityMap: (id: string, value: boolean) => void;
}

const useStore = create<Store>((set) => ({
   visiblityMap: {},
   setVisibilityMap: (id: string, value: boolean) => set((state) => ({ visiblityMap: { ...state.visiblityMap, [id]: value } })),
   //    inc: () => set((state) => ({ count: state.count + 1 })),
}));

export { useStore };

// async function HolyWidget(params: { user: any; userId: string; apiKey: string; darkMode?: boolean }) {
//    const sheet = cssom(new CSSStyleSheet());
//    const tw = twind(config, sheet);

//    const widget = document.createElement("div");
//    const shadowRoot = widget.attachShadow({ mode: "open" });

//    shadowRoot.adoptedStyleSheets = [sheet.target];

//    observe(tw, shadowRoot);
//    document.body.appendChild(widget);

//    createRoot(widget.shadowRoot as ShadowRoot).render(
//       <React.StrictMode>
//          <Embed {...params} />;
//       </React.StrictMode>
//    );
// }

const holyTrigger = (pollId: string) => {
   useStore.getState().setVisibilityMap(pollId, true);
};

// export { holyTrigger };
// export default Embed;
// actual widget
// (window as any).HolyWidget = HolyWidget;
(window as any).Embed = Embed;

// export components
(window as any).YesOrNo = YesOrNo;
(window as any).VerticalAnnouncement = VerticalAnnouncement;

// export helpers
(window as any).Container = Container;
(window as any).ModalWrapper = ModalWrapper;
