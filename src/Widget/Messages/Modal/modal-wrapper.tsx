import { Dialog, DialogContent } from "@/components/ui/dialog";

import { ReactElement } from "react";

export default function ModalWrapper({ children, visible, buttonClick }: { children: ReactElement; visible: boolean; buttonClick: Function }) {
   return (
      <Dialog
         onOpenChange={(isOpening) => {
            if (!isOpening) {
               buttonClick({ option_id: "viewed" });
            }
         }}
         open={visible}
      >
         <DialogContent>{children}</DialogContent>
      </Dialog>
   );
}
