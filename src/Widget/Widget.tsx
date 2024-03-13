import { dbUser, setHolyCookie, supabase, updateOrAddUserInDb } from "@/typesandconst";

import Deployment from "./Deployment";
import { useStore } from "./store";

function Widget({
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
   const { setActiveDeployments, deployments } = useStore();

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

export { Widget };
