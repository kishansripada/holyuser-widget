import { useEffect } from "react";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import Container from "./Modal/ConsistentPadding/WidgetContents/Announcements/Container";
import VerticalAnnouncement from "./Modal/ConsistentPadding/WidgetContents/Announcements/Vertical";
import Modal from "./Modal/Modal";
import NotificationWrapper from "./Notification/notification-wrapper";
import Notification from "./Notification/notification";
import { Dialog, DialogContent } from "@/components/ui/dialog";
type poll = {
   id: number;
   created_at: Date;
   title?: string | null;
   user_id: string | null;
   active_until?: Date | null;
   poll_data: Record<string, any>;
   time_delay_ms: number;
   active: boolean;
   conditions?: any[] | null;
   app_id: string;
   test_ids: string;
};

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
   // console.log(visiblityMap);
   useEffect(() => {
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

   const Announcement = templates.modal || VerticalAnnouncement;

   return (
      <>
         {poll.poll_data.type === "modal" ? (
            <Dialog
               open={visiblityMap[poll.id.toString()]}
               setVisible={(visible: boolean) => setVisibilityMap(poll.id.toString(), visible)}
               sendResponse={sendResponse}
            >
               <DialogContent>
                  {/* <Modal> */}
                  {/* <Container width={poll.poll_data.image_url ? undefined : 500}> */}
                  <Announcement poll={poll} sendResponse={sendResponse} />
                  {/* </Container> */}
                  {/* </Modal> */}
               </DialogContent>
            </Dialog>
         ) : (
            <NotificationWrapper visible={visiblityMap[poll.id.toString()]} sendResponse={sendResponse} position="top-right">
               <Notification poll={poll} sendResponse={sendResponse}></Notification>
            </NotificationWrapper>
         )}
      </>
   );
}

function parseCommaSeparatedList(input: string): string[] {
   // Split the input string by comma and trim whitespace from each item
   const items = input.split(",").map((item) => item.trim());
   return items;
}
