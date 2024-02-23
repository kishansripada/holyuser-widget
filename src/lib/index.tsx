// import React from "react";
import "construct-style-sheets-polyfill";
import { twind, cssom, observe } from "@twind/core";
import config from "../../twind.config";
import { Embed } from "@/Widget/Embed";
// import { createRoot } from "react-dom/client";
import YesOrNo from "@/Widget/ShouldShow/Modal/ConsistentPadding/WidgetContents/Questions/YesOrNo";
import VerticalAnnouncement from "@/Widget/ShouldShow/Modal/ConsistentPadding/WidgetContents/Announcements/Vertical";
import Container from "@/Widget/ShouldShow/Modal/ConsistentPadding/Container";
import ModalWrapper from "@/Widget/ShouldShow/Modal/ModalWrapper";
import { useStore } from "@/Widget/Embed";
import { createRoot } from "react-dom/client";
import React from "react";

// import { create } from "zustand";

// interface Store {
//    visiblityMap: {};
//    setVisibilityMap: (id: string, value: boolean) => void;
// }

// const useStore = create<Store>((set) => ({
//    visiblityMap: {},
//    setVisibilityMap: (id: string, value: boolean) => set((state) => ({ visiblityMap: { ...state.visiblityMap, [id]: value } })),
//    //    inc: () => set((state) => ({ count: state.count + 1 })),
// }));

// export { useStore };

async function HolyWidget(params: { user: any; userId: string; apiKey: string; darkMode?: boolean }) {
   params = {
      userId: "f30197ba-cf06-4234-bcdb-5d40d83c7999",
      apiKey: "c64bcec7-3e92-4e10-bbed-3a4fd551175d",
      user: {
         name: "Kishan",
      },
      ...params,
   };

   const sheet = cssom(new CSSStyleSheet());
   const tw = twind(config, sheet);

   const widget = document.createElement("div");
   const shadowRoot = widget.attachShadow({ mode: "open" });

   shadowRoot.adoptedStyleSheets = [sheet.target];

   observe(tw, shadowRoot);
   document.body.appendChild(widget);

   createRoot(widget.shadowRoot as ShadowRoot).render(
      <React.StrictMode>
         <Embed {...params} />
      </React.StrictMode>
   );
}
const COOKIE_NAME = "holy-user";

interface ModalData {
   [modalName: string]: number;
}

// Retrieves the existing cookie data (or initializes)
function getCookieData(): ModalData {
   const allCookies = document.cookie.split(";");
   for (const cookieStr of allCookies) {
      const [key, value] = cookieStr.split("=").map((part) => part.trim());
      if (key === COOKIE_NAME) {
         return JSON.parse(decodeURIComponent(value));
      }
   }
   return {}; // Start with an empty object
}

// Updates a modal's view count
function incrementModalCount(modalName: string) {
   const cookieData = getCookieData();
   cookieData[modalName] = (cookieData[modalName] || 0) + 1;

   // Set the updated cookie (add expiration options if needed)
   document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(cookieData))}`;
}

const holyTrigger = (pollId: string) => {
   useStore.getState().setVisibilityMap(pollId, true);
   incrementModalCount(pollId);
};

// const Test = () => {
//    return <div>Test, hello there</div>;
// };

// export { holyTrigger };
// export default Embed;
// actual widget
(window as any).HolyWidget = HolyWidget;
// window.Test = Test;
(window as any).Embed = Embed;
(window as any).holyTrigger = holyTrigger;

// export components
(window as any).YesOrNo = YesOrNo;
(window as any).VerticalAnnouncement = VerticalAnnouncement;

// export helpers
(window as any).Container = Container;
(window as any).ModalWrapper = ModalWrapper;
