import { XIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { poll } from "@/typesandconst";

export default function DefaultModal({ poll, sendResponse }: { poll: poll; sendResponse: Function }) {
   return (
      <div className="flex h-full w-full flex-col gap-3 p-6  ">
         <div className="flex flex-row items-start justify-between  ">
            <p className=" text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">{poll.poll_data.title}</p>
            <button
               onClick={() => {
                  sendResponse({ option_id: "close" });
               }}
            >
               <XIcon></XIcon>
            </button>
         </div>

         <p className=" text-sm text-neutral-600 dark:text-neutral-400">{poll.poll_data.subtitle}</p>

         {poll.poll_data.image_url && (
            <div className="h-full w-full overflow-hidden">
               <img
                  className="h-full w-full rounded-md rounded-xl border border-neutral-300 object-cover dark:border-neutral-700"
                  src={poll.poll_data.image_url}
                  alt=""
               />
            </div>
         )}

         <div className="mt-1 flex flex-row items-center  justify-between border-neutral-300 font-medium dark:border-neutral-700 ">
            <div></div>
            <Button
               onClick={() => {
                  sendResponse({ option_id: "action_button" });
               }}
               size={"sm"}
            >
               Okay, let's go!
            </Button>
         </div>
      </div>
   );
}
