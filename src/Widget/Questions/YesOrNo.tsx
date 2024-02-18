import { Button } from "@/components/ui/button";

export default function YesOrNo({ poll, sendResponse }) {
   return (
      <div className="flex flex-col gap-3  w-full h-full">
         <p className="font-bold tracking-tight text-neutral-900 text-lg dark:text-neutral-100">{poll.poll_data.title}</p>
         <p className="text-neutral-600 dark:text-neutral-400 text-sm">{poll.poll_data.subtitle}</p>

         <div className="flex flex-row justify-between mt-3">
            <Button
               onClick={() => {
                  sendResponse({ option_id: "no" });
               }}
               variant={"outline"}
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
