import { Dialog, DialogContent } from "@/components/ui/dialog";

import { ReactElement } from "react";

export default function ModalWrapper({ children, visible, buttonClick }: { children: ReactElement; visible: boolean; buttonClick: Function }) {
   return (
      <div
         style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.2s",
            pointerEvents: visible ? "all" : "none",
         }}
      >
         <Dialog
            open={visible}
            // onOpenChange={(isOpening) => {
            //    if (!isOpening) {
            //       buttonClick({ choice: "next_step" });
            //    }
            // }}
            // open={visible}
         >
            <DialogContent>{children}</DialogContent>
         </Dialog>
      </div>
   );
}
