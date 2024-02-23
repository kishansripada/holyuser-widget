import { XIcon } from "@/assets/icons";

export default function VerticalAnnouncement({ poll, sendResponse }: { poll: any; sendResponse: Function }) {
   return (
      <div className="flex h-full w-full flex-col gap-3">
         <div className="flex flex-row items-start justify-between">
            <p className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">{poll.poll_data.title}</p>
            <button
               onClick={() => {
                  sendResponse({ option_id: "close" });
               }}
            >
               <XIcon></XIcon>
            </button>
         </div>

         <p className="text-sm text-neutral-600 dark:text-neutral-400">{poll.poll_data.subtitle}</p>

         <div className="h-full w-full overflow-hidden ">
            <img className="h-full w-full rounded-md rounded-xl object-cover" src={poll.poll_data.image_url} alt="" />
         </div>
      </div>
   );
}
