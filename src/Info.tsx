import { useEffect, useState } from "react";
import { useStore } from "./Widget/store";
import { Button } from "./components/ui/button";
import { resetCookies } from "./lib";

export default function Info({}: {}) {
   const { userId, userWithCookies, activeDeployments, deployments, messages } = useStore();
   const [equalsPressed, setEqualsPressed] = useState(false);
   const [equalsCount, setEqualsCount] = useState(0);
   const timeoutLimit = 1000; // Time limit for quick presses (milliseconds)
   let pressTimeout = null;

   const handleKeyDown = (event) => {
      if (event.key === "=") {
         console.log("equalsCount", equalsCount);
         setEqualsCount(equalsCount + 1);

         // Check for 5 presses
         if (equalsCount >= 4) {
            setEqualsPressed(true);
            setEqualsCount(0); // Reset the count
         }

         // Timeout to reset count
         clearTimeout(pressTimeout);
         pressTimeout = setTimeout(() => {
            setEqualsCount(0);
         }, timeoutLimit);
      } else if (event.key === "Escape") {
         setEqualsPressed(false);
         setEqualsCount(0);
      }
   };

   useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);

      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, [equalsCount]);

   if (!equalsPressed) return null;
   return (
      <div className="fixed right-10 top-10 w-[250px] rounded-md border border-neutral-200 bg-white p-3 text-black">
         <div className="flex flex-row items-center justify-between">
            <div className="text-lg font-semibold">Info</div>
            <Button
               onClick={() => {
                  resetCookies();
               }}
            >
               Reset cookies
            </Button>
         </div>

         <div className="flex flex-col gap-1 text-xs">
            <div>id: {userId}</div>
            <div>email: {userWithCookies?.user?.email}</div>

            {Object.keys(activeDeployments).map((key) => {
               if (!activeDeployments[key]) return null;
               const activeNode = activeDeployments[key];
               const deployment = deployments.find((deployment) => deployment.id === key);

               return (
                  <div key={deployment.id}>
                     <div>{deployment?.name}</div>
                     <div>id: {deployment.id}</div>
                     <div>nodeId: {activeNode}</div>

                     <div className="h-px w-full bg-neutral-200"></div>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
