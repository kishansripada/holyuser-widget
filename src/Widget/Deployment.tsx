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
   const { setActiveDeployments, activeDeployments, messages, userId, audiences, userWithCookies } = useStore();

   const nodes = deployment.data_tree.nodes;
   const [currentNodeId, setCurrentNodeId] = useState<string>(deployment.data_tree.nodes[0].id);
   const currentMessageId = nodes.find((node) => node.id === currentNodeId)?.message_id;
   const currentMessage = messages.find((message) => message.id === currentMessageId);

   const runChecks = async () => {
      if (!currentMessage) return;

      // trigger here if it's a page load
      if (deployment.data_tree.initialTrigger !== "page_load") return;

      // should not have already seen the deployment
      const cookies = getCookieData();
      // if (cookies[deployment.id]) return;

      console.log("before delay");
      await delay(deployment?.data_tree?.initialTriggerDelay || 0);
      console.log("after delay");

      setActiveDeployments(deployment.id, true);
      deploymentWasTriggered(deployment.id);
   };

   useEffect(() => {
      runChecks();
   }, []);

   const buttonClick = async (response_data) => {
      const nextNode = deployment.data_tree.nodes.find((node) => node.parent_id === currentNodeId);

      if (nextNode) {
         setCurrentNodeId(nextNode.id);
      } else {
         setActiveDeployments(deployment.id, false);
      }

      // let { data, error } = await supabase.from("responses").insert({ user_id: userId, poll_id: poll.id, response_data });
   };

   type ModalProps = {
      poll: poll;
      sendResponse: Function;
   };

   const Modal: FC<ModalProps> = typeof templates?.modal === "function" ? templates.modal : DefaultModal;

   if (!activeDeployments[deployment.id]) return <></>;

   return (
      <>
         {messages
            .filter((message) => message.id === currentMessageId)
            .map((message) => {
               return (
                  <div key={message.id}>
                     <Message
                        visible={currentMessage === message.id || activeDeployments[deployment.id]}
                        key={currentMessage.id}
                        setCurrentMessageId={setCurrentNodeId}
                        supabase={supabase}
                        message={message}
                        templates={templates}
                        buttonClick={buttonClick}
                     />
                  </div>
               );
            })}
      </>
   );
}

function delay(ms: number): Promise<void> {
   return new Promise((resolve) => {
      setTimeout(resolve, ms);
   });
}
