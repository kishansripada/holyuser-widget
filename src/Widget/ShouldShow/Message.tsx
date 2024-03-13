import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FC, useEffect } from "react";

import DefaultModal from "./Modal/default-modal";
import DefaultPopover from "./Popover/default-popover";
import Notification from "./Notification/default-notification";
import NotificationWrapper from "./Notification/notification-wrapper";
import PopoverWrapper from "./Popover/popover-wrapper";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { poll } from "@/typesandconst";

export default function Message({
   message,
   user,
   userId,
   supabase,
   templates,
   setCurrentMessageId,
}: {
   message: poll;
   user: any;
   userId: string;
   supabase: SupabaseAuthClient;
   templates: Record<string, React.ReactElement>;
   setCurrentMessageId: Function;
}) {
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
            fn(user);
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
            <Dialog open={true} onOpenChange={(visible: boolean) => setVisibilityMap(message.id.toString(), visible)}>
               <DialogContent>
                  <Modal poll={message} sendResponse={sendResponse} />
               </DialogContent>
            </Dialog>
         ) : message.poll_data.type === "notification" ? (
            <NotificationWrapper visible={true} sendResponse={sendResponse} position="top-right">
               <Notification poll={message} sendResponse={sendResponse}></Notification>
            </NotificationWrapper>
         ) : (
            <PopoverWrapper anchor={message.anchor} visible={true} sendResponse={sendResponse}>
               <DefaultPopover poll={message} sendResponse={sendResponse}></DefaultPopover>
            </PopoverWrapper>
         )}
      </>
   );
}
