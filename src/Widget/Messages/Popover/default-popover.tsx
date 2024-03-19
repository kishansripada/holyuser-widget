import { Button } from "@/components/ui/button";
import { XIcon } from "@/assets/icons";

export default function DefaultPopover({ poll, sendResponse }: { poll: any; sendResponse: Function }) {
   return (
      <div className="flex flex-col gap-3 p-4 ">
         <div className="flex flex-col items-start gap-1 ">
            <div className="flex w-full flex-row items-start justify-between">
               <p className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">{poll.poll_data.title}</p>
               <button
                  onClick={() => {
                     sendResponse({ choice: "end_deployment" });
                  }}
               >
                  <XIcon></XIcon>
               </button>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">{poll.poll_data.subtitle}</p>
         </div>
         <Button
            // variant={"outline"}
            onClick={() => {
               sendResponse({ choice: "next_step" });
            }}
            size={"sm"}
         >
            Got it
         </Button>
      </div>
   );
}
