import { FC, useEffect } from "react";
import { poll } from "@/typesandconst";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

import Notification from "./Notification/default-notification";
import NotificationWrapper from "./Notification/notification-wrapper";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import DefaultModal from "./Modal/default-modal";
import PopoverWrapper from "./Popover/popover-wrapper";
import DefaultPopover from "./Popover/default-popover";
import { send } from "process";

export default function Poll({
   poll,
   user,
   userId,
   supabase,
   templates,
   visiblityMap,
   setVisibilityMap,
}: {
   poll: poll;
   user: any;
   userId: string;
   supabase: SupabaseAuthClient;
   templates: Record<string, React.ReactElement>;
   visiblityMap: Record<string, boolean>;
   setVisibilityMap: (pollId: string, visible: boolean) => void;
}) {
   const getExistingResponse = async () => {
      let { data } = await supabase.from("responses").select("*").eq("user_id", userId).eq("poll_id", poll.id);

      return data;
   };

   useEffect(() => {
      setVisibilityMap(poll.id.toString(), poll.active);
      let timerId;
      const filterFns = (poll.conditions || []).map((cond) => {
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
      setVisibilityMap(poll.id, false);
      let { data, error } = await supabase.from("responses").insert({ user_id: userId, poll_id: poll.id, response_data });
   };

   type ModalProps = {
      poll: poll;
      sendResponse: Function;
   };

   const Modal: FC<ModalProps> = typeof templates.modal === "function" ? templates.modal : DefaultModal;

   return (
      <>
         {poll.poll_data.type === "modal" ? (
            <Dialog open={visiblityMap[poll.id.toString()]} onOpenChange={(visible: boolean) => setVisibilityMap(poll.id.toString(), visible)}>
               <DialogContent>
                  <Modal poll={poll} sendResponse={sendResponse} />
               </DialogContent>
            </Dialog>
         ) : poll.poll_data.type === "notification" ? (
            <NotificationWrapper visible={visiblityMap[poll.id.toString()]} sendResponse={sendResponse} position="top-right">
               <Notification poll={poll} sendResponse={sendResponse}></Notification>
            </NotificationWrapper>
         ) : (
            <PopoverWrapper anchor={poll.poll_data.unique_id} visible={visiblityMap[poll.id.toString()]} sendResponse={sendResponse}>
               <DefaultPopover poll={poll} sendResponse={sendResponse}></DefaultPopover>
            </PopoverWrapper>
         )}
      </>
   );
}
