import VerticalAnnouncement from "./Widget/ShouldShow/Modal/ConsistentPadding/WidgetContents/Announcements/Vertical";
import Container from "./Widget/ShouldShow/Modal/ConsistentPadding/Container";
import ModalWrapper from "./Widget/ShouldShow/Modal/ModalWrapper";
import YesOrNo from "./Widget/ShouldShow/Modal/ConsistentPadding/WidgetContents/Questions/YesOrNo";

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
   // const [darkMode, setDarkMode] = useState(false);
   return (
      <div>
         <button
            onClick={() => {
               // setDarkMode(!darkMode);
               document.body.classList.toggle("dark");
            }}
         >
            toggle dark
         </button>
         <div className="grid w-full grid-cols-3">
            <ModalWrapper visible={true} setVisible={() => null}>
               <Container height={574} width={461}>
                  <VerticalAnnouncement poll={SAMPLE_ANNOUNCEMENT}></VerticalAnnouncement>
               </Container>
            </ModalWrapper>
            <div className=" w-full">
               <Container>
                  <YesOrNo poll={SAMPLE_YES_OR_NO}></YesOrNo>
               </Container>
            </div>
         </div>
      </div>
   );
}

export default App;
