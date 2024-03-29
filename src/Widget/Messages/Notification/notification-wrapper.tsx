import { useEffect, useState } from "react";

export default function NotificationWrapper({
   visible,
   sendResponse,
   children,
   position,
}: {
   visible: boolean;
   sendResponse: Function;
   children: any;
   position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
   const [hovering, setHovering] = useState(false);

   const HIGH_Z_INDEX = 9999;
   const DISTANCE_FROM_EDGE = 40;
   const WIDTH = 350;

   useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;
      if (visible && !hovering) {
         timer = setTimeout(() => {
            sendResponse({ option_id: "viewed" });
         }, 5000);
      }

      return () => {
         clearTimeout(timer);
      };
   }, [visible, hovering]);

   return (
      <>
         <div
            onMouseEnter={() => {
               setHovering(true);
            }}
            onMouseLeave={() => {
               setHovering(false);
            }}
            style={{
               zIndex: HIGH_Z_INDEX,
               pointerEvents: visible ? "all" : "none",
               top: position.includes("top") ? DISTANCE_FROM_EDGE : "auto",
               bottom: position.includes("bottom") ? DISTANCE_FROM_EDGE : "auto",
               left: position.includes("left") ? DISTANCE_FROM_EDGE : "auto",
               right: position.includes("right") ? 0 : "auto",
               width: DISTANCE_FROM_EDGE + WIDTH,
            }}
            className=" absolute select-none  overflow-hidden  "
         >
            <div
               onMouseEnter={() => {
                  setHovering(true);
               }}
               onMouseLeave={() => {
                  setHovering(false);
               }}
               style={{
                  zIndex: HIGH_Z_INDEX,
                  translate: !visible ? WIDTH + DISTANCE_FROM_EDGE : 0,

                  pointerEvents: visible ? "all" : "none",
                  transitionDuration: "400ms",
                  opacity: visible ? 1 : 0,
                  transitionProperty: "opacity, translate",
               }}
               className="  h-full w-full select-none border-neutral-300 p-4 transition  ease-in-out dark:border-neutral-700"
            >
               <div
                  style={{
                     width: WIDTH,

                     //   height: "100px",
                  }}
                  className="overflow-hidden rounded-xl border border-neutral-200 bg-white drop-shadow-md dark:border-neutral-700 dark:bg-neutral-950"
               >
                  {children}
               </div>
            </div>
         </div>
      </>
   );
}
