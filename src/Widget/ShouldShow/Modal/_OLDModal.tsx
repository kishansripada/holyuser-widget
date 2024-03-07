export default function Modal({
   visible,
   setVisible,
   sendResponse,
   children,
}: {
   visible: boolean;
   setVisible: any;
   sendResponse: Function;
   children: any;
}) {
   const HIGH_Z_INDEX = 9999;

   return (
      <>
         <div
            style={{
               opacity: visible ? 1 : 0,
               pointerEvents: visible ? "all" : "none",
            }}
            className="transition duration-150 ease-in-out"
         >
            <div
               onClick={() => {
                  setVisible(false);
                  sendResponse({ option_id: "click_outside_modal" });
               }}
               style={{
                  zIndex: HIGH_Z_INDEX - 1,
               }}
               className="absolute left-0 top-0  h-full w-full bg-neutral-950/60"
            ></div>
            <div
               style={{
                  zIndex: HIGH_Z_INDEX,
                  opacity: visible ? 1 : 0,
                  pointerEvents: visible ? "all" : "none",
               }}
               className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none border-neutral-300 transition  duration-150 ease-in-out dark:border-neutral-700"
            >
               {children}
            </div>
         </div>
      </>
   );
}
