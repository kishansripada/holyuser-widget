import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FC, useEffect } from "react";

import DefaultModal from "./Messages/Modal/default-modal";
import DefaultPopover from "./Messages/Popover/default-popover";
import ModalWrapper from "./Messages/Modal/modal-wrapper";
import Notification from "./Messages/Notification/default-notification";
import NotificationWrapper from "./Messages/Notification/notification-wrapper";
import PopoverWrapper from "./Messages/Popover/popover-wrapper";
import { SupabaseClient } from "@supabase/supabase-js";
import { poll } from "@/typesandconst";
import { useStore } from "./store";

export default function Message({
   message,
   supabase,
   templates,
   setCurrentMessageId,
   buttonClick,
   visible,
}: {
   message: poll;
   supabase: SupabaseClient<any, "public", any>;
   templates: Record<string, React.ReactElement>;
   setCurrentMessageId: Function;
   buttonClick: Function;
   visible: boolean;
}) {
   const { userId, userWithCookies } = useStore();

   const getExistingResponse = async () => {
      let { data } = await supabase.from("responses").select("*").eq("user_id", userId).eq("poll_id", message.id);

      return data;
   };

   useEffect(() => {
      // setVisibilityMap(message.id.toString(), message.active && window.location.hostname === "localhost");
      let timerId;
      const filterFns = (message.conditions || []).map((cond) => {
         return new Function("user", `return ${cond.condition_string}`);
      });

      const passesAllFilters = filterFns.every((fn) => {
         try {
            fn(userWithCookies);
         } catch {
            console.log("error");
         }
      });

      if (!passesAllFilters) return;

      // if (new Date(poll.active_until) < new Date()) return;

      // getExistingResponse().then((existingResponse) => {
      //    if ((existingResponse || []).length) return;
      //    timerId = setTimeout(() => {
      //       setVisibilityMap(poll.id.toString(), true);
      //    }, poll.time_delay_ms);
      // });

      // Create a reference to the timer

      // // Clean up the timer when the component unmounts or when dependencies change
      return () => clearTimeout(timerId);
   }, []); // Pass an empty dependency array if you only want to run the effect once

   const sendResponse = async (response_data) => {
      // CHAGNE
      setCurrentMessageId(message.id);

      // setVisibilityMap(message.id, false);
      let { data, error } = await supabase.from("responses").insert({ user_id: userId, poll_id: message.id, response_data });
   };

   type ModalProps = {
      poll: poll;
      sendResponse: Function;
   };

   const Modal: FC<ModalProps> = typeof templates?.modal === "function" ? templates.modal : DefaultModal;

   return (
      <>
         {message.poll_data.type === "modal" ? (
            <ModalWrapper visible={visible} buttonClick={buttonClick}>
               <Modal poll={message} sendResponse={buttonClick} />
            </ModalWrapper>
         ) : message.poll_data.type === "notification" ? (
            <NotificationWrapper visible={visible} sendResponse={buttonClick} position="top-right">
               <Notification poll={message} sendResponse={buttonClick}></Notification>
            </NotificationWrapper>
         ) : (
            <PopoverWrapper anchor={message.anchor} visible={visible} sendResponse={buttonClick}>
               <DefaultPopover poll={message} sendResponse={buttonClick}></DefaultPopover>
            </PopoverWrapper>
         )}
      </>
   );
}
