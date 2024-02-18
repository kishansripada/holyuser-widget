import { useEffect, useState } from "react";
import YesOrNo from "./Questions/YesOrNo";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import Container from "./Container";

type poll = {
   id: number;
   created_at: Date;
   title?: string | null;
   user_id: string | null;
   active_until?: Date | null;
   poll_data?: Record<string, any> | null;
   time_delay_ms: number;
   active: boolean;
   conditions?: any[] | null;
   app_id: string;
   test_ids: string;
};

export default function ShowPollWrapper({ poll, user, userId, supabase }: { poll: poll; user: any; userId: string; supabase: SupabaseAuthClient }) {
   const isTestUser = parseCommaSeparatedList(poll.test_ids).includes(userId);
   const [showModal, setShowModal] = useState(isTestUser);
   const HIGH_Z_INDEX = 9999;

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
         <div
            style={{
               opacity: showModal ? 1 : 0,
               pointerEvents: showModal ? "all" : "none",
            }}
            className="transition duration-150 ease-in-out"
         >
            <div
               onClick={() => {
                  setShowModal(false);
                  sendResponse({ option_id: "click_outside_modal" });
               }}
               style={{
                  zIndex: HIGH_Z_INDEX - 1,
               }}
               className="absolute w-full h-full  bg-neutral-950/60 left-0 top-0"
            ></div>
            <div
               style={{
                  zIndex: HIGH_Z_INDEX,
                  opacity: showModal ? 1 : 0,
                  pointerEvents: showModal ? "all" : "none",
               }}
               className=" select-none  rounded-lg border  dark:border-neutral-700 border-neutral-300 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 overflow-hidden transition duration-150 ease-in-out"
            >
               <Container height={300} width={500}>
                  {" "}
                  <YesOrNo poll={poll} sendResponse={sendResponse} />
               </Container>
            </div>
         </div>
      </>
   );
}

function parseCommaSeparatedList(input: string): string[] {
   // Split the input string by comma and trim whitespace from each item
   const items = input.split(",").map((item) => item.trim());
   return items;
}
