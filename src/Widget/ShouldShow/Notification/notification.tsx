import { XIcon } from "@/assets/icons";

export default function Notification({ poll, sendResponse }: { poll: any; sendResponse: Function }) {
   return (
      <div className="flex h-full w-full flex-row justify-between gap-2 ">
         <div className="flex flex-col items-start gap-1  ">
            <p className="font-bold tracking-tight text-neutral-900 dark:text-neutral-100">{poll.poll_data.title}</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">{poll.poll_data.subtitle}</p>
         </div>

         {/* {poll.poll_data.image_url && (
            <div className="h-full  overflow-hidden">
               <img
                  style={{
                     width: 85,
                  }}
                  className="h-full rounded-md rounded-xl border border-neutral-300 object-cover dark:border-neutral-700"
                  src={poll.poll_data.image_url}
                  alt=""
               />
            </div>
         )} */}
         <div className="flex h-full flex-col ">
            <button
               onClick={() => {
                  sendResponse({ option_id: "close" });
               }}
            >
               <XIcon></XIcon>
            </button>
         </div>
      </div>
   );
}
