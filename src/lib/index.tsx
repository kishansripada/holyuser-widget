// import React from "react";
import "construct-style-sheets-polyfill";

import { COOKIE_NAME, pushCookies, setHolyCookie } from "@/typesandconst";
import { cssom, observe, twind } from "@twind/core";

import DefaultModal from "@/Widget/ShouldShow/Modal/default-modal";
import DefaultNotification from "@/Widget/ShouldShow/Notification/default-notification";
import DefaultPopover from "@/Widget/ShouldShow/Popover/default-popover";
import { Embed } from "@/Widget/Embed";
import ModalWrapper from "@/Widget/ShouldShow/Modal/modal-wrapper";
import NotificationWrapper from "@/Widget/ShouldShow/Notification/notification-wrapper";
import PopoverWrapper from "@/Widget/ShouldShow/Popover/popover-wrapper";
import React from "react";
import config from "../../twind.config";
import { createRoot } from "react-dom/client";
import { useStore } from "@/Widget/Embed";

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
export function getCookieData(): ModalData {
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
export function deploymentWasTriggered(deploymentId: string) {
   const cookieData = getCookieData();
   cookieData[deploymentId] = (cookieData[deploymentId] || 0) + 1;
   console.log(cookieData);
   pushCookies(useStore.getState().apiKey, useStore.getState().userId, cookieData);
   setHolyCookie(cookieData);
}

const startHyperDeployment = (deploymentId: string) => {
   const views = getCookieData();

   // const triggerString = useStore.getState().polls.find((poll) => poll.id.toString() === pollId)?.trigger_schedule || "";

   // const triggerSchedule = triggerString.split(",").map((item: string) => item.trim());

   const numViews = (views[deploymentId] || 0) + 1;

   // if (triggerSchedule.includes(numViews.toString())) {
   useStore.getState().setActiveDeployments(deploymentId, true);
   // }
   deploymentWasTriggered(deploymentId);
};

const endHyperDeployment = (pollId: string) => {
   const views = getCookieData();

   // const triggerString = useStore.getState().polls.find((poll) => poll.id.toString() === pollId)?.trigger_schedule || "";

   // const triggerSchedule = triggerString.split(",").map((item: string) => item.trim());

   const numViews = (views[pollId] || 0) + 1;
   // if (triggerSchedule.includes(numViews.toString())) {
   // useStore.getState().setVisibilityMap(pollId, false);
   // }
   deploymentWasTriggered(pollId);
};

export { HolyWidget, startHyperDeployment };

(window as any).HolyWidget = HolyWidget;
// window.Test = Test;
(window as any).Embed = Embed;
(window as any).holyTrigger = startHyperDeployment;

// export components
// (window as any).YesOrNo = YesOrNo;
(window as any).DefaultModal = DefaultModal;
(window as any).DefaultNotification = DefaultNotification;

(window as any).ModalWrapper = ModalWrapper;
(window as any).NotificationWrapper = NotificationWrapper;

(window as any).PopoverWrapper = PopoverWrapper;
(window as any).DefaultPopover = DefaultPopover;
// export helpers
// (window as any).Container = Container;
// (window as any).ModalWrapper = ModalWrapper;
