export default function MCQ({ poll, sendResponse }) {
   return (
      <div className="flex bg-white dark:bg-neutral-900 flex-col gap-3 p-6 w-full h-full">
         <p className="font-bold tracking-tight text-neutral-900 text-lg dark:text-neutral-100">{poll.poll_data.title}</p>
         <p className="text-neutral-600 dark:text-neutral-400 text-sm">{poll.poll_data.subtitle}</p>
         <div className="w-full  text-sm gap-2.5 grid grid-cols-2  ">
            {poll.poll_data.options.map((option, index) => {
               return (
                  <button
                     key={option.id}
                     onClick={() => {
                        sendResponse({ option_id: option.id });
                     }}
                     className="w-full h-10  py-2 rounded-md border dark:hover:bg-neutral-700 dark:border-neutral-700 border-neutral-300  justify-start items-center p-3 flex hover:bg-neutral-100 transition"
                  >
                     <div className="dark:text-white text-black">{option.title}</div>
                  </button>
               );
            })}
         </div>
      </div>
   );
}
