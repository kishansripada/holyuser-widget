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
   if (useStore.getState().initialized) return;
   useStore.getState().setInitialized(true);

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

export function incrementCookiePropertyCount(cookieProperty: string) {
   const cookieData = getCookieData();
   cookieData[cookieProperty] = (cookieData[cookieProperty] || 0) + 1;
   setHolyCookie(cookieData);

   return cookieData;
}

const trackEvent = (eventId: string, data: any) => {
   const deployments = useStore.getState().deployments;
   const events = useStore.getState().events;

   const event = events.find((event) => event.unique_id === eventId);

   if (!event) {
      console.error(`Event with id "${eventId}" not found`);
      return;
   }
   console.log("Event tracked", eventId);

   // check to see if the event has any deployments associated with it
   const deploymentsToTrigger = deployments.filter((deployment) => deployment.data_tree.initialTriggerEvent === event.id);

   if (!deploymentsToTrigger) {
      console.log(`No deployments found for event with id: "${eventId}"`);
      return;
   }

   const views = getCookieData();
   const numCodeTriggers = (views[eventId] || 0) + 1;

   deploymentsToTrigger.forEach((deployment) => {
      const messagesAfterTrigger = deployment.data_tree.nodes.filter((node) => node.parent_id === "initialTrigger");
      const messageToTrigger = messagesAfterTrigger.find(
         (node) => parseInt(node.programmatic_filter) === numCodeTriggers || parseInt(node.programmatic_filter) === -1
      );

      if (!messageToTrigger) {
         console.log(`Deployment with id ${deployment.id} was fired for the ${numCodeTriggers} time, but no message was found.`);
         return;
      }
      useStore.getState().setActiveDeployments(deployment.id, deployment.data_tree.nodes[0].id);
   });
   // check to see if the event has any deployments associated with it

   const cookieData = incrementCookiePropertyCount(eventId);
   pushCookies(useStore.getState().apiKey, useStore.getState().userId, cookieData);
};

const startDeployment = (deploymentId: string) => {
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

const nextStep = (deploymentId: string, stepId: string) => {
   try {
      const deployment = useStore.getState().deployments.find((dep) => dep.id === deploymentId);
      if (!deployment) {
         console.warn(`Deployment with id "${deploymentId}" not found`);
         return;
      }
      if (!deployment.is_live) {
         console.warn(`Deployment with id "${deploymentId}" was found, but is not live so ignored`);
         return;
      }
      if (!useStore.getState().activeDeployments[deploymentId]) {
         console.log(`Deployment with id "${deploymentId}" was found, but is not active so ignored`);
         return;
      }

      const thisNode = deployment.data_tree.nodes.find((node) => node.id === stepId);

      if (!thisNode) {
         console.log(`Deployment with id ${deploymentId} was fired for stepId: ${stepId}, but that step wasn't found`);
         return;
      }

      if (useStore.getState().activeDeployments[deploymentId] !== stepId) {
         console.log(`Deployment with id ${deploymentId} was fired for stepId: ${stepId}, but that step is not the active step`);
         return;
      }

      const nextNode = deployment.data_tree.nodes.find((node) => node.parent_id === stepId);
      if (!nextNode) {
         useStore.getState().setActiveDeployments(deploymentId, false);
         return;
      }

      useStore.getState().setActiveDeployments(deploymentId, nextNode.id);
   } catch {
      console.error(`There was an error starting the deployment with id "${deploymentId}". Please check the logs for more information.`);
   }
};

export const resetCookies = () => {
   setHolyCookie({});
   pushCookies(useStore.getState().apiKey, useStore.getState().userId, {});
};

interface HolyWidget {
   initialize(props: EmbedProps): void;
   startDeployment(deploymentId: string): void;
   // ... other methods of HolyWidget
}

class HolyWidgetImpl implements HolyWidget {
   initialize(props: EmbedProps) {
      HolyWidget(props);
   }
   startDeployment(deploymentId: string) {
      startDeployment(deploymentId);
   }
   trackEvent(eventId: string, data: any) {
      trackEvent(eventId, data);
   }
   nextStep(deploymentId: string, stepId: string) {
      nextStep(deploymentId, stepId);
   }

   // ... implementations for other methods
}

const hyperuser = new HolyWidgetImpl();
(window as any).hyperuser = hyperuser;

// export { HolyWidget, startHyperDeployment };

(window as any).HolyWidget = HolyWidget;
// window.Test = Test;
(window as any).Embed = Embed;
// (window as any).holyTrigger = startHyperDeployment;
// (window as any).endHyperDeployment = endHyperDeployment;

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
