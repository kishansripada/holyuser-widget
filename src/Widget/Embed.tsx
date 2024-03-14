import { dbUser, setHolyCookie, supabase } from "@/typesandconst";

import Deployment from "./Deployment";
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
   const { setAudiences, setActiveDeployments, setMessages, setUserWithCookies, setUserId, setApiKey, setDeployments, deployments } = useStore();

   const updateOrAddUserInDb = async (apiKey: string, userId: string, user: string) => {
      const dbUser = await supabase
         .from("sample_data")
         .upsert([{ app_id: apiKey, user_id: userId, user }])
         .select("*")
         .single();

      return dbUser.data;
   };

   const getMessages = async (apiKey: string) => {
      const { data: messages } = await supabase.from("polls").select("*").eq("app_id", apiKey);

      return messages || [];
   };

   const getDeployments = async (apiKey: string) => {
      const { data: deployments } = await supabase.from("deployments").select("*").eq("app_id", apiKey);

      return deployments || [];
   };

   const getAudiences = async (apiKey: string) => {
      const { data: audiences } = await supabase.from("audiences").select("*").eq("app_id", apiKey);

      return audiences || [];
   };

   const getAndSetAllData = async () => {
      if (!userId || !apiKey) return;

      const [dbUser, messages, deployments, audiences] = await Promise.all([
         // update user without cookies
         updateOrAddUserInDb(apiKey, userId, user),
         getMessages(apiKey),
         getDeployments(apiKey),
         getAudiences(apiKey),
      ]);

      // reset cookies to what's in DB
      setHolyCookie(dbUser.cookies);

      // PUT EVERYTHING IN THE STORE
      setUserWithCookies(dbUser);
      setMessages(messages);
      setDeployments(deployments);
      setAudiences(audiences);
      setUserId(userId);
      setApiKey(apiKey);
   };

   useEffect(() => {
      getAndSetAllData();
   }, []);

   if (!userId || !apiKey) return <></>;

   return (
      <div id="lolol" className={`${darkMode ? "dark" : ""}`}>
         {deployments
            .filter((deployment) => deployment.is_live)
            .map((deployment) => {
               return (
                  <Deployment
                     key={deployment.id}
                     setActiveDeployments={setActiveDeployments}
                     supabase={supabase}
                     deployment={deployment}
                     templates={templates}
                  />
               );
            })}
      </div>
   );
}

export { Embed };
