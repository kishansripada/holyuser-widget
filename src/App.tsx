import VerticalAnnouncement from "./Widget/ShouldShow/Modal/ConsistentPadding/WidgetContents/Announcements/Vertical";
import Container from "./Widget/ShouldShow/Modal/ConsistentPadding/WidgetContents/Announcements/Container";
import ModalWrapper from "./Widget/ShouldShow/Modal/Modal";
import YesOrNo from "./Widget/ShouldShow/Modal/ConsistentPadding/WidgetContents/Questions/YesOrNo";
import { Embed } from "./Widget/Embed";
import { holyTrigger } from "@/lib/index";
import { useEffect, useState } from "react";
import NotificationWrapper from "./Widget/ShouldShow/Notification/nofication-wrapper";
import Notification from "./Widget/ShouldShow/Notification/notification";

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
   const [RemoteComponent, setRemoteComponent] = useState(null);

   const [visible, setVisible] = useState(false);

   useEffect(() => {
      const fetchComponent = async () => {
         const response = await fetch("https://widget.holyuser.com/holyuser.js");
         const text = await response.text();
         // Evaluate the fetched JavaScript code
         const module = new Function("return " + text)();

         // Assuming your bundle exports a default component named SharedButton
         setRemoteComponent(module.default);
      };

      fetchComponent();
   }, []);
   return (
      <div className="  grid w-full grid-cols-3">
         <button
            onClick={() => {
               setVisible(!visible);
            }}
         >
            CLICK ME
         </button>
         <NotificationWrapper visible={visible} position="top-right">
            <Notification setVisible={setVisible} poll={SAMPLE_ANNOUNCEMENT}></Notification>
         </NotificationWrapper>
         {/* <ModalWrapper visible={true} setVisible={() => null}>
            <Container height={574} width={461}>
               <VerticalAnnouncement poll={SAMPLE_ANNOUNCEMENT}></VerticalAnnouncement>
            </Container>
         </ModalWrapper> */}
         <div className=" w-full">
            <Container>
               <YesOrNo poll={SAMPLE_YES_OR_NO}></YesOrNo>
            </Container>
         </div>
      </div>
   );

   // return <div>{RemoteComponent ? <RemoteComponent /> : <div>Loading...</div>}</div>;
   // const [darkMode, setDarkMode] = useState(false);

   // return (
   //    <div>
   {
      /* <button
            onClick={() => {
               // setDarkMode(!darkMode);
               document.body.classList.toggle("dark");
            }}
         >
            toggle dark
         </button>
         <button
            onClick={() => {
               // setDarkMode(!darkMode);
               holyTrigger("24");
            }}
         >
            trigger timleine!
         </button> */
   }

   {
      /* <Embed userId="f30197ba-cf06-4234-bcdb-5d40d83c7999" user={{ name: "Kishan" }} apiKey="c64bcec7-3e92-4e10-bbed-3a4fd551175d"></Embed> */
   }

   // </div>
   // );
}

export default App;
