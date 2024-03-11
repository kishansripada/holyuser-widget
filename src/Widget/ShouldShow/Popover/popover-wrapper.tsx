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
         <Popover open={visible} side="right" anchor={anchor}>
            {children}
         </Popover>
      </>
   );
}
