export default function VerticalAnnouncement({ announcement }) {
   return (
      <div className="flex bg-white dark:bg-neutral-900 flex-col gap-3 p-5 border border-neutral-300 w-1/3 h-3/4  absolute rounded-xl">
         <p className="font-bold tracking-tight text-neutral-900 text-2xl dark:text-neutral-100">Hey Cheerleaders</p>
         <p className="text-neutral-600 dark:text-neutral-400 text-sm">You can now adjust the height of performers in 3D</p>

         <div className="h-full w-full overflow-hidden ">
            <img className="rounded-md h-full w-full object-cover" src="https://i.imgur.com/VMe7jKe.png" alt="" />
         </div>
      </div>
   );
}
