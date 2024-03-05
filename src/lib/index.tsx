// import React from "react";
import "construct-style-sheets-polyfill";
import { twind, cssom, observe } from "@twind/core";
import config from "../../twind.config";
import { Embed } from "@/Widget/Embed";
import YesOrNo from "@/Widget/ShouldShow/Modal/ConsistentPadding/WidgetContents/Questions/YesOrNo";
import VerticalAnnouncement from "@/Widget/ShouldShow/Modal/ConsistentPadding/WidgetContents/Announcements/Vertical";
import Container from "@/Widget/ShouldShow/Modal/ConsistentPadding/WidgetContents/Announcements/Container";
import ModalWrapper from "@/Widget/ShouldShow/Modal/Modal";
import { useStore } from "@/Widget/Embed";
import { createRoot } from "react-dom/client";
import React from "react";
import Notification from "@/Widget/ShouldShow/Notification/notification";
import { COOKIE_NAME, pushCookies, setHolyCookie } from "@/typesandconst";

async function HolyWidget(params: { user: any; userId: string; apiKey: string; darkMode?: boolean; disabled?: boolean }) {
   if (params.disabled) return;

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

   pushCookies(useStore.getState().apiKey, useStore.getState().userId, cookieData);
   setHolyCookie(cookieData);
}

const holyTrigger = (pollId: string) => {
   const views = getCookieData();

   const triggerString = useStore.getState().polls.find((poll) => poll.id.toString() === pollId)?.trigger_schedule || "";

   const triggerSchedule = triggerString.split(",").map((item: string) => item.trim());

   const numViews = (views[pollId] || 0) + 1;
   if (triggerSchedule.includes(numViews.toString())) {
      useStore.getState().setVisibilityMap(pollId, true);
   }
   incrementModalCount(pollId);
};

export { HolyWidget, holyTrigger };

(window as any).HolyWidget = HolyWidget;
// window.Test = Test;
(window as any).Embed = Embed;
(window as any).holyTrigger = holyTrigger;

// export components
(window as any).YesOrNo = YesOrNo;
(window as any).VerticalAnnouncement = VerticalAnnouncement;
(window as any).Notification = Notification;

// export helpers
(window as any).Container = Container;
(window as any).ModalWrapper = ModalWrapper;
