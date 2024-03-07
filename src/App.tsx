import { Embed } from "./Widget/Embed";
import { holyTrigger } from "@/lib/index";
import { useEffect, useState } from "react";

import NotificationWrapper from "./Widget/ShouldShow/Notification/notification-wrapper";
import Notification from "./Widget/ShouldShow/Notification/notification";

import ModalWrapper from "./Widget/ShouldShow/Modal/modal-wrapper";
import DefaultModal from "./Widget/ShouldShow/Modal/default-modal";

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
         <button
            onClick={() => {
               // setVisible(!visible);
            }}
         >
            CLICK ME
         </button>
         {/* <NotificationWrapper visible={visible} position="top-right">
            <Notification setVisible={setVisible} poll={SAMPLE_ANNOUNCEMENT}></Notification>
         </NotificationWrapper> */}
         <ModalWrapper open={true} setVisible={() => null}>
            {/* <Container height={574} width={461}> */}
            <DefaultModal poll={SAMPLE_ANNOUNCEMENT}></DefaultModal>
            <></>
            {/* </Container> */}
         </ModalWrapper>
         {/* <div className=" w-full">
            <Container>
               <YesOrNo poll={SAMPLE_YES_OR_NO}></YesOrNo>
            </Container>
         </div> */}
      </div>
   );
}

export default App;
