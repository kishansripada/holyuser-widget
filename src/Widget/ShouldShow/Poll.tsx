import { useEffect, useState } from "react";
import YesOrNo from "./Modal/ConsistentPadding/WidgetContents/Questions/YesOrNo";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import Container from "./Modal/ConsistentPadding/Container";
import VerticalAnnouncement from "./Modal/ConsistentPadding/WidgetContents/Announcements/Vertical";
import ModalWrapper from "./Modal/ModalWrapper";

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

export default function Poll({ poll, user, userId, supabase }: { poll: poll; user: any; userId: string; supabase: SupabaseAuthClient }) {
   const isTestUser = parseCommaSeparatedList(poll.test_ids).includes(userId);
   const [showModal, setShowModal] = useState(isTestUser);

   const getExistingResponse = async () => {
      let { data } = await supabase.from("responses").select("*").eq("user_id", userId).eq("poll_id", poll.id);

      return data;
   };

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

      if (!poll.active || !passesAllFilters) return;

      // if (new Date(poll.active_until) < new Date()) return;

      getExistingResponse().then((existingResponse) => {
         if ((existingResponse || []).length) return;
         timerId = setTimeout(() => {
            setShowModal(true);
         }, poll.time_delay_ms);
      });

      // Create a reference to the timer

      // // Clean up the timer when the component unmounts or when dependencies change
      return () => clearTimeout(timerId);
   }, []); // Pass an empty dependency array if you only want to run the effect once

   const sendResponse = async (response_data) => {
      setShowModal(false);
      let { data, error } = await supabase.from("responses").insert({ user_id: userId, poll_id: poll.id, response_data });
   };

   return (
      <>
         <ModalWrapper visible={showModal} setVisible={setShowModal} sendResponse={sendResponse}>
            {poll.poll_data.type === "yesorno" ? (
               <Container width={500}>
                  <YesOrNo poll={poll} sendResponse={sendResponse} />
               </Container>
            ) : poll.poll_data.type === "announcement" ? (
               <Container width={500} height={700}>
                  <VerticalAnnouncement poll={poll} sendResponse={sendResponse} />
               </Container>
            ) : null}
         </ModalWrapper>
      </>
   );
}

function parseCommaSeparatedList(input: string): string[] {
   // Split the input string by comma and trim whitespace from each item
   const items = input.split(",").map((item) => item.trim());
   return items;
}