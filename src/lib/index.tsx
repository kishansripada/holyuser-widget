// import React from "react";
import "construct-style-sheets-polyfill";

import { COOKIE_NAME, pushCookies, setHolyCookie } from "@/typesandconst";
import { cssom, observe, twind } from "@twind/core";

import DefaultModal from "@/Widget/Messages/Modal/default-modal";
import DefaultNotification from "@/Widget/Messages/Notification/default-notification";
import DefaultPopover from "@/Widget/Messages/Popover/default-popover";
import { Embed } from "@/Widget/Embed";
import ModalWrapper from "@/Widget/Messages/Modal/modal-wrapper";
import NotificationWrapper from "@/Widget/Messages/Notification/notification-wrapper";
import PopoverWrapper from "@/Widget/Messages/Popover/popover-wrapper";
import React from "react";
import config from "../../twind.config";
import { createRoot } from "react-dom/client";
import { useStore } from "@/Widget/store";

export interface EmbedProps {
   disabled?: boolean;
   userId: string;
   apiKey: string;
   user: {
      name: string;
   };
}

async function HolyWidget(params: EmbedProps) {
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

   pushCookies(useStore.getState().apiKey, useStore.getState().userId, cookieData);
   setHolyCookie(cookieData);
}

const startHyperDeployment = (deploymentId: string) => {
   try {
      const deployment = useStore.getState().deployments.find((dep) => dep.id === deploymentId);
      if (!deployment) {
         console.error(`Deployment with id "${deploymentId}" not found`);
         return;
      }

      if (!deployment.is_live) {
         console.warn(`Deployment with id "${deploymentId}" was found, but is not live so ignored`);
         return;
      }
      const views = getCookieData();
      const numCodeTriggers = (views[deploymentId] || 0) + 1;

      deploymentWasTriggered(deploymentId);

      const messageToTrigger = deployment.data_tree.nodes.find((node) => parseInt(node.programmatic_filter) === numCodeTriggers);

      if (!messageToTrigger) {
         console.log(`Deployment with id ${deploymentId} was fired for the ${numCodeTriggers} time, but no message was found.`);
         return;
      }
      useStore.getState().setActiveDeployments(deploymentId, true);
   } catch {
      console.error(`There was an error starting the deployment with id "${deploymentId}". Please check the logs for more information.`);
   }
};

const endHyperDeployment = (deploymentId: string) => {
   try {
      const views = getCookieData();
      useStore.getState().setActiveDeployments(deploymentId, false);

      // const triggerString = useStore.getState().polls.find((poll) => poll.id.toString() === pollId)?.trigger_schedule || "";

      // const triggerSchedule = triggerString.split(",").map((item: string) => item.trim());

      // const numViews = (views[pollId] || 0) + 1;
      // if (triggerSchedule.includes(numViews.toString())) {
      // useStore.getState().setVisibilityMap(pollId, false);
      // }
      // deploymentWasTriggered(deploymentId);
   } catch {}
};

interface HolyWidget {
   initialize(props: EmbedProps): void;
   // ... other methods of HolyWidget
}

class HolyWidgetImpl implements HolyWidget {
   initialize(props: EmbedProps) {
      HolyWidget(props);
   }
   startHyperDeployment(deploymentId: string) {
      startHyperDeployment(deploymentId);
   }

   // ... implementations for other methods
}

const hyperuser = new HolyWidgetImpl();
(window as any).hyperuser = hyperuser;

export { HolyWidget, startHyperDeployment };

(window as any).HolyWidget = HolyWidget;
// window.Test = Test;
(window as any).Embed = Embed;
(window as any).holyTrigger = startHyperDeployment;
(window as any).endHyperDeployment = endHyperDeployment;

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
