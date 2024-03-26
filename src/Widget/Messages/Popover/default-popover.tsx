import { Button } from "@/components/ui/button";
import { XIcon } from "@/assets/icons";

export default function DefaultPopover({ poll, sendResponse }: { poll: any; sendResponse: Function }) {
   if (!poll.markdown) return <></>;
   const blocks = poll.markdown.split("\n");
   // console.log(blocks);

   const h1 = (text: string) => <h1 className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">{text}</h1>;
   const ComButton = () => (
      <Button
         className="mt-2 w-full"
         // variant={"outline"}
         onClick={() => {
            sendResponse({ choice: "next_step" });
         }}
         size={"sm"}
      >
         Got it
      </Button>
   );

   return (
      <div className="flex flex-col p-4 ">
         {blocks.map((block, index) => {
            if (block.startsWith("#")) {
               return (
                  <div
                     style={{
                        marginRight: index === 0 ? "20px" : "0",
                     }}
                  >
                     {h1(block.replace("#", ""))}
                  </div>
               );
            } else if (block.startsWith("<") && block.endsWith("/>")) {
               const tag = block.replace("<", "").replace(">", "").replace("/", "");
               console.log(tag);
               if (tag.trim() === "Button")
                  return (
                     <div
                        className="w-full"
                        style={{
                           marginRight: index === 0 ? "20px" : "0",
                        }}
                     >
                        <ComButton key={index}></ComButton>
                     </div>
                  );

               return (
                  <p
                     style={{
                        marginRight: index === 0 ? "20px" : "0",
                     }}
                     key={index}
                     className="mt-1 text-xs text-neutral-600 dark:text-neutral-400"
                  >
                     {block}
                  </p>
               );
            } else {
               return (
                  <p
                     style={{
                        marginRight: index === 0 ? "20px" : "0",
                     }}
                     key={index}
                     className="mt-1 text-xs text-neutral-600 dark:text-neutral-400"
                  >
                     {block}
                  </p>
               );
            }
         })}
         <button
            className="absolute right-[16px] top-[16px]"
            onClick={() => {
               sendResponse({ choice: "end_deployment" });
            }}
         >
            <XIcon></XIcon>
         </button>

         {/* <div className="flex flex-col items-start gap-1 ">
            <div className="flex w-full flex-row items-start justify-between">
               <h1 className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">{poll.poll_data.title}</h1>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">{poll.poll_data.subtitle}</p>
         </div> */}
      </div>
   );
}
