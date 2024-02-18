export default function VerticalAnnouncement({ poll }) {
   return (
      <div className="flex dark:bg-neutral-900 flex-col gap-3">
         <p className="font-bold tracking-tight text-neutral-900 text-2xl dark:text-neutral-100">{poll.poll_data.title}</p>
         <p className="text-neutral-600 dark:text-neutral-400 text-sm">{poll.poll_data.subtitle}</p>

         <div className="h-full w-full overflow-hidden ">
            <img className="rounded-md h-full w-full object-cover" src={poll.poll_data.image_url} alt="" />
         </div>
      </div>
   );
}
