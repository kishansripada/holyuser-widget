import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/utils";

const Popover = React.forwardRef<
   React.ElementRef<typeof PopoverPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
      anchor: string; // Add prop for DOM ID
   } & React.ElementRef<typeof PopoverPrimitive.Root>
>(({ className, align = "center", sideOffset = 4, anchor, children, ...props }, ref) => {
   const [targetRect, setTargetRect] = React.useState<DOMRect | null>(null);
   const [preferredSide, setPreferredSide] = React.useState("bottom"); // Initial side

   React.useEffect(() => {
      const targetElement = document.querySelectorAll(`[data-hyperuser="${anchor}"]`)[0];

      if (targetElement) {
         requestAnimationFrame(() => {
            setTargetRect(targetElement.getBoundingClientRect());
         });
      }
   }, [anchor]);

   React.useEffect(() => {
      if (!targetRect) return;

      const spaceAbove = targetRect.top;
      const spaceBelow = targetRect.bottom;

      const spaceLeft = targetRect.left;
      const spaceRight = targetRect.right;

      const smallestSpace = Math.min(spaceAbove, spaceBelow, spaceLeft, spaceRight);

      const newPrefferedSide =
         smallestSpace === spaceAbove ? "bottom" : smallestSpace === spaceBelow ? "top" : smallestSpace === spaceLeft ? "right" : "left";
      console.log(newPrefferedSide);
      setPreferredSide(newPrefferedSide);
   }, [targetRect]);

   return (
      <>
         <PopoverPrimitive.Root open={props.open}>
            {targetRect && (
               <PopoverPrimitive.Portal>
                  <PopoverPrimitive.Content
                     ref={ref}
                     align={align}
                     sideOffset={sideOffset}
                     data-side={preferredSide}
                     style={{
                        position: "absolute",
                        top: targetRect.top + 50,
                        left: targetRect.left,
                        transform: "translateX(-50%)",
                        opacity: 0.5,
                     }}
                     className={cn(
                        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border border-neutral-200 bg-white  text-neutral-950 shadow-md outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50"
                     )}
                     {...props}
                  >
                     {children}
                     <PopoverPrimitive.Arrow />
                  </PopoverPrimitive.Content>
               </PopoverPrimitive.Portal>
            )}
         </PopoverPrimitive.Root>
      </>
   );
});
// PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover };
