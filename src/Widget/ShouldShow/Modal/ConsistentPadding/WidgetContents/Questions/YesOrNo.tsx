import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function YesOrNo({ poll, sendResponse }) {
   const [test, setTest] = useState("test");
   return (
      <div className="flex h-full w-full  flex-col gap-3">
         <p className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100">{poll.poll_data.title}</p>
         <p className="text-sm text-neutral-600 dark:text-neutral-400">{poll.poll_data.subtitle}</p>

         <div className="mt-3 flex flex-row justify-between">
            <Button
               onClick={() => {
                  sendResponse({ option_id: "no" });
               }}
               variant={"secondary"}
            >
               {poll.poll_data.yesorno.no_button}
            </Button>
            <Button
               onClick={() => {
                  sendResponse({ option_id: "yes" });
               }}
            >
               {poll.poll_data.yesorno.yes_button}
            </Button>
         </div>
      </div>
   );
}
