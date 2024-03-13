import { dbUser, setHolyCookie, supabase, updateOrAddUserInDb } from "@/typesandconst";

import Deployment from "./Deployment";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useStore } from "./store";

function Embed({
   user,
   userId,
   apiKey,
   darkMode,
   templates,
}: {
   user: any;
   userId: string;
   apiKey: string;
   darkMode?: boolean;
   templates?: Record<string, React.ReactElement>;
}) {
   const { activeDeployments, setActiveDeployments, setPolls, setDbUser, setUserId, setApiKey, setDeployments, deployments } = useStore();

   const getMessages = async (apiKey: string) => {
      const { data: messages } = await supabase.from("polls").select("*").eq("app_id", apiKey);

      return messages || [];
   };

   const getDeployments = async (apiKey: string) => {
      const { data: deployments } = await supabase.from("deployments").select("*").eq("app_id", apiKey);

      return deployments || [];
   };

   const getUserAndPolls = async () => {
      if (!userId || !apiKey) return;

      const [dbUser, polls, deployments] = await Promise.all([
         // update user without cookies
         updateOrAddUserInDb(apiKey, userId, user),
         getMessages(apiKey),
         getDeployments(apiKey),
      ]);
      console.log(deployments);

      // reset cookies to what's in DB
      setHolyCookie(dbUser.cookies);

      // put and polls in store
      setDbUser(dbUser);
      setPolls(polls);
      setDeployments(deployments);
   };

   useEffect(() => {
      setUserId(userId);
      setApiKey(apiKey);

      getUserAndPolls();
   }, []);

   if (!userId || !apiKey) return <></>;

   return (
      <div className={`${darkMode ? "dark" : ""}`}>
         {deployments
            .filter((deployment) => deployment.is_live)
            .map((deployment) => {
               return (
                  <Deployment
                     key={deployment.id}
                     // isActive={activeDeployments[deployment.id.toString()]}
                     setActiveDeployments={setActiveDeployments}
                     supabase={supabase}
                     userId={userId}
                     user={user}
                     deployment={deployment}
                     templates={templates}
                  />
               );
            })}
      </div>
   );
}

export { Embed };
