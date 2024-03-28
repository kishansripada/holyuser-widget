import { Button } from "@/components/ui/button";
import { XIcon } from "@/assets/icons";
import { poll } from "@/typesandconst";

export default function DefaultModal({ poll, sendResponse }: { poll: poll; sendResponse: Function }) {
   poll.markdown = `#Feedback is always appreciated
   We promise we'll reply in 24 hours, sometimes much faster :)
<Button />`;
   if (!poll.markdown) return <></>;
   const blocks = poll.markdown.split("\n");
   const h1 = (text: string) => <p className=" text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">{text}</p>;
   const hushed = (text: string) => <p className=" text-sm text-neutral-600 dark:text-neutral-400">{text}</p>;
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
      <div className=" flex h-full w-full flex-col gap-3  p-6 ">
         <button
            className="absolute right-[24px] top-[24px]"
            onClick={() => {
               sendResponse({ choice: "end_deployment" });
            }}
         >
            <XIcon></XIcon>
         </button>

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
                     className="mt-1 text-xs text-neutral-500 dark:text-neutral-400"
                  >
                     {block}
                  </p>
               );
            } else {
               return hushed(block);
            }
         })}

         {/* <p className=" text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">{poll.poll_data.title}</p>

         <p className=" text-sm text-neutral-600 dark:text-neutral-400">{poll.poll_data.subtitle}</p>

         {poll.poll_data.image_url.includes("www.youtube.com") ? (
            <iframe
               style={{
                  height: 350,
                  width: 600,
               }}
               // width="560"
               // height="315"
               className="h-full w-full rounded-md rounded-xl "
               src={poll.poll_data.image_url.replace("watch?v=", "embed/")}
               title="YouTube video player"
               frameborder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
               allowFullScreen
            ></iframe>
         ) : poll.poll_data.image_url ? (
            <div className="h-full w-full overflow-hidden">
               <img
                  className="h-full w-full  rounded-xl border border-neutral-300 object-cover dark:border-neutral-700"
                  src={poll.poll_data.image_url}
                  alt=""
               />
            </div>
         ) : null}

         <div className="mt-1 flex flex-row items-center  justify-between border-neutral-300 font-medium dark:border-neutral-700 ">
            <div></div>
            <Button
               onClick={() => {
                  sendResponse({ choice: "next_step" });
               }}
               size={"sm"}
            >
               Okay, let's go!
            </Button>
         </div> */}
      </div>
   );
}
