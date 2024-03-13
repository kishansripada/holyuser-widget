import { FC, useEffect, useState } from "react";
import { deploymentWasTriggered, getCookieData } from "@/lib";

import DefaultModal from "./Messages/Modal/default-modal";
import Message from "./Message";
import { SupabaseClient } from "@supabase/supabase-js";
import { deployment } from "@/typesandconst";
import { useStore } from "./store";

export default function Deployment({
   deployment,
   supabase,
   templates,
}: {
   supabase: SupabaseClient<any, "public", any>;
   deployment: deployment;
   templates: Record<string, React.ReactElement>;
}) {
   const { setActiveDeployments, activeDeployments, messages, userId } = useStore();

   const [currentMessageId, setCurrentMessageId] = useState<string>(deployment.data_tree.nodes[0].message_id);
   const currentMessage = messages.find((message) => message.id === currentMessageId);

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

   const buttonClick = async (response_data) => {
      setActiveDeployments(deployment.id, false);

      let { data, error } = await supabase.from("responses").insert({ user_id: userId, poll_id: poll.id, response_data });
   };

   type ModalProps = {
      poll: poll;
      sendResponse: Function;
   };

   const Modal: FC<ModalProps> = typeof templates?.modal === "function" ? templates.modal : DefaultModal;

   //    if (!activeDeployments[deployment.id]) return <></>;

   console.log(messages);
   return (
      <>
         {messages.map((message) => {
            return (
               <div key={message.id}>
                  <Message
                     visible={currentMessage === message.id || activeDeployments[deployment.id]}
                     key={currentMessage.id}
                     setCurrentMessageId={setCurrentMessageId}
                     supabase={supabase}
                     message={currentMessage}
                     templates={templates}
                     buttonClick={buttonClick}
                  />
               </div>
            );
         })}
      </>
   );
}
