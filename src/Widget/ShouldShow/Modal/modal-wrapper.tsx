import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ReactElement } from "react";

export default function ModalWrapper({ children, open, setVisible }: { children: ReactElement[]; open: boolean; setVisible: Function }) {
   return (
      <Dialog open={true} setVisible={() => null}>
         <DialogContent>{children}</DialogContent>
      </Dialog>
   );
}
