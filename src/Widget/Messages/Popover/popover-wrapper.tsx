import { Popover } from "@/components/ui/popover";

export default function PopoverWrapper({
   anchor,
   visible,
   sendResponse,
   children,
}: {
   visible: boolean;
   sendResponse: Function;
   children: any;
   anchor: string;
}) {
   return (
      <>
         <div
            style={{
               opacity: visible ? 1 : 0,
               transition: "opacity 0.2s",
               pointerEvents: visible ? "all" : "none",
            }}
         >
            <Popover open={true} side="right" anchor={anchor}>
               {children}
            </Popover>
         </div>
      </>
   );
}
