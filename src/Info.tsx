import { useEffect, useState } from "react";
import { useStore } from "./Widget/store";
import { Button } from "./components/ui/button";
import { resetCookies } from "./lib";
import { Fragment } from "react";
export default function Info({}: {}) {
   const { userId, userWithCookies, activeDeployments, deployments, messages, setActiveDeployments } = useStore();

   const user = userWithCookies.user;
   const [equalsPressed, setEqualsPressed] = useState(true);
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
   if (!userWithCookies.user) return null;

   if (!equalsPressed) return null;
   return (
      <div className="fixed bottom-10 right-10 top-10 w-[350px] overflow-scroll rounded-md border border-neutral-200 bg-white p-3 text-black">
         <div className="rounded-lg bg-gray-100 p-4 text-xs shadow-md">
            <div className="flex flex-row items-center justify-between">
               <div className="text-lg font-semibold">Hyperuser Admin</div>
               <Button
                  onClick={() => {
                     resetCookies();
                  }}
               >
                  Reset cookies
               </Button>
            </div>

            <div className="mt-4">
               <span className="font-semibold">User ID:</span> {userId}
            </div>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
               {Object.entries(user).map(([key, value]) => (
                  <Fragment key={key}>
                     <dt className="font-semibold">{key}:</dt>
                     <dd className="mt-1">
                        {typeof value === "string" ? (
                           <span>{value}</span>
                        ) : value === null ? (
                           <span className="italic text-gray-500">None</span>
                        ) : Array.isArray(value) ? (
                           <ul className="ml-6 list-inside list-disc">
                              {value.map((item) => (
                                 <li key={item}>{item}</li>
                              ))}
                           </ul>
                        ) : (
                           <pre className="overflow-x-auto rounded bg-gray-50 p-2 text-sm">{JSON.stringify(value, null, 2)}</pre>
                        )}
                     </dd>
                  </Fragment>
               ))}
            </dl>
         </div>

         <div className="mt-6 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500">
               <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                  <tr>
                     <th className="px-6 py-3">ID</th>

                     <th className="px-6 py-3">Name</th>
                     <th className="px-6 py-3">Is Live?</th>
                     <th className="px-6 py-3">Is Running?</th>
                     <th className="px-6 py-3">Toggle</th>
                  </tr>
               </thead>
               <tbody>
                  {deployments.map((deployment) => (
                     <tr key={deployment.id} className="border-b bg-white">
                        <td className="px-6 py-4">{deployment.id}</td>

                        <td className="px-6 py-4">{deployment.name}</td>
                        <td className="px-6 py-4">
                           {deployment.is_live ? (
                              <span className="rounded bg-green-200 px-2 py-1 text-green-700">Yes</span>
                           ) : (
                              <span className="rounded bg-red-200 px-2 py-1 text-red-700">No</span>
                           )}
                        </td>
                        <td className="px-6 py-4">
                           {activeDeployments[deployment.id] ? (
                              <span className="rounded bg-green-200 px-2 py-1 text-green-700">Yes</span>
                           ) : (
                              <span className="rounded bg-red-200 px-2 py-1 text-red-700">No</span>
                           )}
                        </td>
                        <td className="px-6 py-4">
                           <Button
                              onClick={() => {
                                 if (activeDeployments[deployment.id]) {
                                    setActiveDeployments(deployment.id, false);
                                 } else {
                                    setActiveDeployments(deployment.id, deployment.data_tree.nodes[0].id);
                                 }
                              }}
                           >
                              Toggle
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
