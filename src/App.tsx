import { useEffect, useState } from "react";

import DefaultModal from "./Widget/ShouldShow/Modal/default-modal";
import DefaultPopover from "./Widget/ShouldShow/Popover/default-popover";
import { Embed } from "./Widget/Embed";
import ModalWrapper from "./Widget/ShouldShow/Modal/modal-wrapper";
import Notification from "./Widget/ShouldShow/Notification/default-notification";
import NotificationWrapper from "./Widget/ShouldShow/Notification/notification-wrapper";
import { Popover } from "./components/ui/popover";
import PopoverWrapper from "./Widget/ShouldShow/Popover/popover-wrapper";
import { holyTrigger } from "@/lib/index";

const SAMPLE_ANNOUNCEMENT = {
   poll_data: {
      type: "announcement",
      title: "Hey Cheerleaders!",
      subtitle: "You can now change the height of a dancer off the ground",
      image_url: "https://i.imgur.com/VMe7jKe.png",
   },
};

const SAMPLE_YES_OR_NO = {
   poll_data: {
      type: "yesorno",
      title: "Are you open to taking a 15 min zoom call to hear about how you use FORMI for cheer?",
      yesorno: {
         no_button: "No, thanks",
         yes_button: "Sure",
      },
      subtitle: "Just quickly want to learn how to make the app better for you guys",
   },
};

function App() {
   return (
      <div className="  grid w-full grid-cols-3">
         <Embed
            darkMode={true}
            user={{
               email: "kishansripada@gmail.com",
               created_at: new Date().toDateString(),
               how_you_found_out: "",
               selectedUses: [],
               plan: "choreographer",
            }}
            userId={"f30197ba-cf06-4234-bcdb-5d40d83c7999"}
            apiKey={"c64bcec7-3e92-4e10-bbed-3a4fd551175d"}
         ></Embed>
         {/* {JSON.stringify(activeDeployments)} */}

         <button
            onClick={() => {
               // setVisible(!visible);
            }}
         >
            CLICK ME
         </button>
         <div data-hyperuser="audio">hi there</div>
         <div className="grid h-screen w-full place-items-center"></div>

         {/* <Popover open={true}> */}
         {/* <PopoverWrapper visible={true} side="right" anchor="audio">
            <DefaultPopover poll={SAMPLE_ANNOUNCEMENT}></DefaultPopover>
         </PopoverWrapper> */}
         {/* </Popover> */}

         {/* <NotificationWrapper visible={visible} position="top-right">
            <Notification setVisible={setVisible} poll={SAMPLE_ANNOUNCEMENT}></Notification>
         </NotificationWrapper> */}
         {/* <ModalWrapper open={false} setVisible={() => null}> */}
         {/* <Container height={574} width={461}> */}
         {/* <DefaultModal poll={SAMPLE_ANNOUNCEMENT}></DefaultModal> */}
         <></>
         {/* </Container> */}
         {/* </ModalWrapper> */}
         {/* <div className=" w-full">
            <Container>
               <YesOrNo poll={SAMPLE_YES_OR_NO}></YesOrNo>
            </Container>
         </div> */}
      </div>
   );
}

export default App;
