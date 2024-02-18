import VerticalAnnouncement from "./Widget/Announcements/Vertical";
import Container from "./Widget/Container";
import YesOrNo from "./Widget/Questions/YesOrNo";

const SAMPLE_ANNOUNCEMENT = {
   poll_data: {
      type: "announcement",
      title: "Hey Cheerleaders! You can now change the height of a dancer off the ground",
      subtitle: "We poll our users sometimes to make FORMI better for everyone!",
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
      <>
         <Container height={"75%"} width={"40%"}>
            <VerticalAnnouncement poll={SAMPLE_ANNOUNCEMENT}></VerticalAnnouncement>
         </Container>
         <Container height={"75%"} width={"40%"}>
            <YesOrNo poll={SAMPLE_YES_OR_NO}></YesOrNo>
         </Container>
      </>
   );
}

export default App;
