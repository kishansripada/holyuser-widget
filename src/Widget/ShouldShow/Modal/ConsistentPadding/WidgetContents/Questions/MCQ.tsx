export default function MCQ({ poll, sendResponse }) {
   return (
      <div className="flex h-full w-full flex-col  gap-3 ">
         <p className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100">{poll.poll_data.title}</p>
         <p className="text-sm text-neutral-600 dark:text-neutral-400">{poll.poll_data.subtitle}</p>
         <div className="grid  w-full grid-cols-2 gap-2.5 text-sm  ">
            {poll.poll_data.options.map((option, index) => {
               return (
                  <button
                     key={option.id}
                     onClick={() => {
                        sendResponse({ option_id: option.id });
                     }}
                     className="flex h-10 w-full items-center justify-start rounded-md border border-neutral-300  p-3 py-2 transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-700"
                  >
                     <div className="text-black dark:text-white">{option.title}</div>
                  </button>
               );
            })}
         </div>
      </div>
   );
}
