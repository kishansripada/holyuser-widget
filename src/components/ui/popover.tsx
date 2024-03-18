import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import { cn } from "@/utils";

const Popover = React.forwardRef<
   React.ElementRef<typeof PopoverPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
      anchor: string; // Add prop for DOM ID
   } & React.ElementRef<typeof PopoverPrimitive.Root>
>(({ className, align = "center", sideOffset = 4, anchor, children, ...props }) => {
   const [targetRect, setTargetRect] = React.useState<DOMRect | null>(null);
   const [preferredSide, setPreferredSide] = React.useState("bottom"); // Initial side
   const [popoverHeight, setPopoverHeight] = React.useState(0);
   const [popoverWidth, setPopoverWidth] = React.useState(0);

   const [popoverOverflowSide, setPopoverOverflowSide] = React.useState<"top" | "bottom" | "left" | "right" | null>(null);

   const [exceedsBy, setExceedsBy] = React.useState(0);
   React.useEffect(() => {
      const targetElement = document.querySelectorAll(`[data-hyperuser="${anchor}"]`)[0];

      if (targetElement) {
         requestAnimationFrame(() => {
            setTargetRect(targetElement.getBoundingClientRect());
         });
      }
   }, [anchor]);

   const ref = React.useRef();
   React.useEffect(() => {
      // Initial setting of height and width
      const setInitialDimensions = () => {
         if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setPopoverHeight(rect.height);
            setPopoverWidth(rect.width);
         }
      };

      setInitialDimensions(); // Call to get the initial dimensions

      const mutationObserver = new MutationObserver((mutations) => {
         mutations.forEach((mutation) => {
            if (mutation.type === "attributes" && mutation.attributeName === "style") {
               const target = mutation.target;
               // Verify if the changed element is the actual anchor
               if (target.dataset.hyperuser === anchor) {
                  requestAnimationFrame(() => {
                     setTargetRect(target.getBoundingClientRect());
                  });
               }
            }
         });
      });
      const targetElement = document.querySelectorAll(`[data-hyperuser="${anchor}"]`)[0];
      if (targetElement) {
         mutationObserver.observe(targetElement, { attributes: true });
      }
      // Resize Observer setup (same as before)
      // const resizeObserver = new ResizeObserver((entries) => {
      //    // ... your existing Resize Observer logic ...
      // });

      // if (ref.current) {
      //    resizeObserver.observe(ref.current);
      // }

      // Cleanup on unmount
      // return () => resizeObserver.disconnect();

      return () => mutationObserver.disconnect();
   }, [ref.current]);

   React.useEffect(() => {
      if (!targetRect) return;
      let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

      const spaceAbove = targetRect.top;
      const spaceBelow = vh - targetRect.bottom;

      const spaceLeft = targetRect.left;
      const spaceRight = vw - targetRect.right;

      const smallestSpace = Math.min(spaceAbove, spaceBelow, spaceLeft, spaceRight);

      const newPrefferedSide =
         smallestSpace === spaceAbove ? "bottom" : smallestSpace === spaceBelow ? "top" : smallestSpace === spaceLeft ? "right" : "left";

      setPreferredSide(newPrefferedSide);

      if (preferredSide === "bottom" || preferredSide === "top") {
         const necessaryDistanceFromSide = (popoverWidth - targetRect.width) / 2 + PADDING_FROM_VIEWPORT;
         const exceedsLeft = spaceLeft - necessaryDistanceFromSide;
         const exceedsRight = spaceRight - necessaryDistanceFromSide;

         if (exceedsLeft < 0) {
            setPopoverOverflowSide("left");
            setExceedsBy(exceedsLeft);
         } else if (exceedsRight < 0) {
            setPopoverOverflowSide("right");
            setExceedsBy(exceedsRight);
         } else {
            setPopoverOverflowSide(null);
         }
      }

      if (preferredSide === "right" || preferredSide === "left") {
         const necessaryDistanceFromSide = (popoverHeight - targetRect.height) / 2 + PADDING_FROM_VIEWPORT;

         const exceedsTop = spaceAbove - necessaryDistanceFromSide;

         const exceedsBottom = spaceBelow - necessaryDistanceFromSide;

         if (exceedsTop < 0) {
            setPopoverOverflowSide("top");
            setExceedsBy(exceedsTop);
         } else if (exceedsBottom < 0) {
            setPopoverOverflowSide("bottom");
            setExceedsBy(exceedsBottom);
         } else {
            setPopoverOverflowSide(null);
         }
      }
   }, [targetRect, ref.current, popoverHeight, popoverWidth]);

   const PADDING_FROM_ELEMENT = 40;
   const PADDING_FROM_VIEWPORT = 20;

   const styles = (() => {
      let styles = {};

      // if (!popoverHeight || !popoverWidth) return styles;
      if (preferredSide === "bottom") {
         styles = {
            top: targetRect?.bottom + PADDING_FROM_ELEMENT,
            ...(popoverOverflowSide === "right" ? { right: PADDING_FROM_VIEWPORT } : {}),
            ...(popoverOverflowSide !== "right"
               ? {
                    left: popoverOverflowSide === "left" ? PADDING_FROM_VIEWPORT : targetRect?.left + targetRect?.width / 2,
                 }
               : {}),

            ...(!popoverOverflowSide
               ? {
                    transform: "translate(-50%, 0)",
                 }
               : {}),
         };
      }

      if (preferredSide === "top") {
         styles = {
            top: targetRect?.top - PADDING_FROM_ELEMENT,
            ...(popoverOverflowSide === "right" ? { right: PADDING_FROM_VIEWPORT } : {}),
            ...(popoverOverflowSide !== "right"
               ? {
                    left: popoverOverflowSide === "left" ? PADDING_FROM_VIEWPORT : targetRect?.left + targetRect?.width / 2,
                 }
               : {}),
            ...(!popoverOverflowSide
               ? {
                    transform: "translate(-50%, -100%)",
                 }
               : { transform: "translate(0, -100%)" }),
         };
      }

      if (preferredSide === "left") {
         styles = {
            left: targetRect?.left - PADDING_FROM_ELEMENT,

            ...(popoverOverflowSide === "top"
               ? { top: PADDING_FROM_VIEWPORT }
               : popoverOverflowSide === "bottom"
                 ? { bottom: PADDING_FROM_VIEWPORT }
                 : { top: targetRect?.top + targetRect?.height / 2 }),

            ...(!popoverOverflowSide
               ? {
                    transform: "translate(-100%, -50%)",
                 }
               : { transform: "translate(-100%, 0)" }),
            // transform: "translate(-100%,-50%)",
         };
      }

      if (preferredSide === "right") {
         styles = {
            left: targetRect?.right + PADDING_FROM_ELEMENT,
            ...(popoverOverflowSide === "top"
               ? { top: PADDING_FROM_VIEWPORT }
               : popoverOverflowSide === "bottom"
                 ? { bottom: PADDING_FROM_VIEWPORT }
                 : { top: targetRect?.top + targetRect?.height / 2 }),

            ...(!popoverOverflowSide
               ? {
                    transform: "translate(0,-50%)",
                 }
               : { transform: "translate(0,0)" }),
         };
      }

      let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

      return styles;
   })();

   const arrowStyles = (() => {
      function clamp(num: number, bound: number): number {
         return Math.min(Math.max(num, -bound), bound);
      }

      let styles = {};

      if (!popoverHeight || !popoverWidth) return styles;

      if (preferredSide === "bottom") {
         styles = {
            left: popoverWidth / 2 + clamp(exceedsBy, popoverWidth / 2 - 30) * (popoverOverflowSide === "right" ? -1 : 1),
            top: 11.5,
            transform: "translate(-50%, -100%)",
         };
      }

      if (preferredSide === "top") {
         styles = {
            left: popoverWidth / 2 + clamp(exceedsBy, popoverWidth / 2 - 30) * (popoverOverflowSide === "right" ? -1 : 1),
            bottom: -32,
            transform: "rotate(180deg) translate(50%, 0)",
         };
      }

      if (preferredSide === "right") {
         styles = {
            left: -31.5,
            top: popoverHeight / 2 + clamp(exceedsBy, popoverHeight / 2 - 30) * (popoverOverflowSide === "bottom" ? -1 : 1),
            transform: "rotate(-90deg) translate(50%, 0)",
         };
      }

      if (preferredSide === "left") {
         styles = {
            right: -31.5,
            top: popoverHeight / 2 + clamp(exceedsBy, popoverHeight / 2 - 30) * (popoverOverflowSide === "bottom" ? -1 : 1),
            transform: "rotate(90deg) translate(-50%, 0)",
         };
      }
      return styles;
   })();

   return (
      <>
         {/* <PopoverPrimitive.Root open={props.open}> */}
         {/* {targetRect && ( */}
         {/* //{" "} */}
         {/* <PopoverPrimitive.Portal> */}
         <div
            ref={ref}
            // align={align}
            // sideOffset={sideOffset}
            // data-side={preferredSide}
            style={{
               position: "absolute",
               ...styles,
            }}
            className={cn(
               "data-[state=open]:animate-in  data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2  z-50 w-72 rounded-md border border-neutral-200 bg-white  text-neutral-950 shadow-md outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50"
            )}
            {...props}
         >
            <svg
               style={{
                  ...arrowStyles,
               }}
               className="absolute   h-[43px] w-[43px] "
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="4 3 36 33"
            >
               <path
                  className="fill-white stroke-neutral-300 dark:fill-black dark:stroke-neutral-800"
                  d="M23.665 4.75 37.09 28c.962 1.667-.241 3.75-2.166 3.75H8.077c-1.925 0-3.128-2.083-2.165-3.75L19.335 4.75c.962-1.667 3.368-1.667 4.33 0Z"
               />
               <path className="fill-black" d="M4 28h36v8H4z" />
            </svg>

            {children}
         </div>
         {/* //{" "} */}
         {/* </PopoverPrimitive.Portal> */}
         {/* )} */}
         {/* </PopoverPrimitive.Root> */}
      </>
   );
});

export { Popover };
