import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FC, useEffect, useState } from "react";
import { deploymentWasTriggered, getCookieData } from "@/lib";

import DefaultModal from "./ShouldShow/Modal/default-modal";
import Message from "./ShouldShow/Message";
import Poll from "./ShouldShow/Message";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { useStore } from "./store";

export default function Deployment({
   deployment,
   user,
   userId,
   supabase,
   templates,
}: {
   supabase: SupabaseAuthClient;
   userId: string;
   user: any;
   deployment: any;
   templates: Record<string, React.ReactElement>;
}) {
   const { setActiveDeployments, activeDeployments, polls } = useStore();

   const [currentMessageId, setCurrentMessageId] = useState<string>(deployment.data_tree.nodes[0].message_id);
   const currentMessage = polls.find((poll) => poll.id === currentMessageId);

   //    const getExistingResponse = async () => {
   //       let { data } = await supabase.from("responses").select("*").eq("user_id", userId).eq("poll_id", poll.id);

   //       return data;
   //    };
   //    console.log(currentMessageId);
   useEffect(() => {
      if (!currentMessage) return;

      const cookies = getCookieData();

      // if deployment is on load, set it to active
      if (deployment.data_tree.initialTrigger === "page_load" && !cookies[deployment.id]) {
         setActiveDeployments(deployment.id, true);
         deploymentWasTriggered(deployment.id);
      }

      //   setVisibilityMap(poll.id.toString(), poll.active && window.location.hostname === "localhost");
      //   let timerId;
      //   const filterFns = deployment.data_tree.initialAudience.map((cond) => {
      //      return new Function("user", `return ${cond.condition_string}`);
      //   });
      //   const passesAllFilters = filterFns.every((fn) => {
      //      try {
      //         fn(user);
      //      } catch {
      //         console.log("error");
      //      }
      //   });
      //   if (!passesAllFilters) return;
      // if (new Date(poll.active_until) < new Date()) return;
      // getExistingResponse().then((existingResponse) => {
      //    if ((existingResponse || []).length) return;
      //    timerId = setTimeout(() => {
      //       setVisibilityMap(poll.id.toString(), true);
      //    }, poll.time_delay_ms);
      // });
      // Create a reference to the timer
      // // Clean up the timer when the component unmounts or when dependencies change
      //   return () => clearTimeout(timerId);
   }, []); // Pass an empty dependency array if you only want to run the effect once

   const sendResponse = async (response_data) => {
      //   setVisibilityMap(poll.id, false);
      let { data, error } = await supabase.from("responses").insert({ user_id: userId, poll_id: poll.id, response_data });
   };

   type ModalProps = {
      poll: poll;
      sendResponse: Function;
   };

   const Modal: FC<ModalProps> = typeof templates?.modal === "function" ? templates.modal : DefaultModal;

   if (!activeDeployments[deployment.id]) return <></>;
   return (
      <Message
         setCurrentMessageId={setCurrentMessageId}
         supabase={supabase}
         key={currentMessage.id}
         userId={userId}
         user={user}
         message={currentMessage}
         templates={templates}
      />
   );
}
