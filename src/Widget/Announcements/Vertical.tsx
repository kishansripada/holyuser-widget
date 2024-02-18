import { XIcon } from "@/assets/icons";

export default function VerticalAnnouncement({ poll }) {
   return (
      <div className="flex dark:bg-neutral-900 flex-col gap-3 h-full w-full">
         <div className="flex flex-row justify-between items-center">
            <p className="font-bold tracking-tight text-neutral-900 text-2xl dark:text-neutral-100">{poll.poll_data.title}</p>
            <XIcon></XIcon>
         </div>

         <p className="text-neutral-600 dark:text-neutral-400 text-sm">{poll.poll_data.subtitle}</p>

         <div className="h-full w-full overflow-hidden ">
            <img className="rounded-md h-full w-full object-cover rounded-2xl" src={poll.poll_data.image_url} alt="" />
         </div>
      </div>
   );
}
