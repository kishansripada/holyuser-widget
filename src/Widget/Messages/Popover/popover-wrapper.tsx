import { Popover } from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";

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
   const [localVisible, setLocalVisible] = useState(false);

   useEffect(() => {
      if (visible) {
         setLocalVisible(visible);
      }
   }, [visible]);

   const test = async (visible) => {
      if (!visible) {
         await delay(1200);
         setLocalVisible(false);
      }
   };

   useDidUpdateEffect(() => {
      test(visible);
   }, [visible]);

   return (
      <>
         <div
            style={{
               opacity: localVisible ? 1 : 0,
               transition: "opacity 0.2s",
               pointerEvents: localVisible ? "all" : "none",
            }}
            className=""
         >
            <Popover open={true} side="right" anchor={anchor}>
               <div
                  style={{
                     opacity: visible ? 1 : 0,
                     transition: "opacity 0.2s",
                     pointerEvents: visible ? "all" : "none",
                  }}
                  className=""
               >
                  {children}
               </div>
               <div
                  style={{
                     opacity: !visible ? 1 : 0,
                     transition: "opacity 0.2s",
                     pointerEvents: "none",
                  }}
                  className="absolute left-0 top-0 flex h-full w-full flex-row items-center justify-center p-3"
               >
                  <div className="text-xl font-semibold ">
                     <span className="mr-2">👍</span> Nice job
                  </div>
               </div>
            </Popover>
         </div>
      </>
   );
}

function delay(ms: number) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}

function useDidUpdateEffect(fn, inputs) {
   const isMountingRef = useRef(false);

   useEffect(() => {
      isMountingRef.current = true;
   }, []);

   useEffect(() => {
      if (!isMountingRef.current) {
         return fn();
      } else {
         isMountingRef.current = false;
      }
   }, inputs);
}
