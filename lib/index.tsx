// import App from "../src/App";
import React, { useEffect, useRef } from "react";
// import { Index } from "../src/Widget/Index";
// import MCQ from "../src/Widget/Questions/MCQ";
// import YesOrNo from "../src/Widget/Questions/YesOrNo";
// import ReactDOM from "react-dom";
// import "construct-style-sheets-polyfill";
// // import React from "react";
// import { twind, cssom, observe } from "@twind/core";
// import config from "../twind.config";
import { Index } from "@/Widget/Index";
import { createRoot } from "react-dom/client";
// import { createRoot } from "react-dom/client";

// import ReactDOM from "react-dom/client";
async function HolyWidget(params) {
   const widget = document.createElement("div");
   // widget.id = "root";
   document.body.appendChild(widget);
   // widget.attachShadow({ mode: "open" });

   // const response = await fetch(tailwindstyles);
   // const css = await response.text();
   // const styleElem = document.createElement("style");
   // styleElem.innerHTML = css;
   // widget.shadowRoot.appendChild(styleElem);

   // const anotherresponse = await fetch(dayPickerStyles);
   // const morecss = await anotherresponse.text();
   // const elem = document.createElement("style");
   // elem.innerHTML = morecss;
   // widget.shadowRoot.appendChild(elem);

   createRoot(widget).render(
      <React.StrictMode>
         <Index {...params} />
      </React.StrictMode>
   );
}

(window as any).HolyWidget = HolyWidget;
// (window as any).Tour = Tour;

// const HolyMetrics = (params) => {
//    const ref = useRef(null);
//    const sheet = cssom(new CSSStyleSheet());
//    const tw = twind(config, sheet);
//    useEffect(() => {
//       const shadowRoot = ref?.current?.shadowRoot || ref?.current?.attachShadow({ mode: "open" });

//       shadowRoot.adoptedStyleSheets = [sheet.target];
//       observe(tw, shadowRoot);

//       // Create a container element
//       // const container = document.createElement("div");

//       // const root =

//       // ReactDOM.createRoot(container);
//       // root.render(<Index {...params} />);

//       // // Append container to shadowRoot
//       // shadowRoot.appendChild(container);
//       // // Render your React component inside the container
//       // ReactDOM.render(<Index {...params} />, container);

//       // // Append the container with the React component to the Shadow DOM
//       // shadowRoot.appendChild(container);

//       // Clean up on component unmount
//       return () => {
//          // ReactDOM.unmountComponentAtNode(container);
//          // root.unmount();
//       };
//    }, []);

//    return (
//       <div ref={ref}>
//          <Index {...params} />
//       </div>
//    );
// };

// const MCQShadow = (params) => {
//    const ref = useRef(null);
//    const sheet = cssom(new CSSStyleSheet());
//    const tw = twind(config, sheet);
//    useEffect(() => {
//       // if (ref.current.shadowRoot) return;
//       console.log("RENDEr");
//       const shadowRoot = ref.current.shadowRoot || ref.current.attachShadow({ mode: "open" });

//       shadowRoot.adoptedStyleSheets = [sheet.target];
//       observe(tw, shadowRoot);

//       // Create a container element
//       const container = document.createElement("footer");

//       // Render your React component inside the container
//       ReactDOM.render(<MCQ {...params} />, container);

//       // Append the container with the React component to the Shadow DOM
//       shadowRoot.appendChild(container);

//       // Clean up on component unmount
//       return () => {
//          ReactDOM.unmountComponentAtNode(container);
//       };
//    }, []);

//    return <div ref={ref}></div>;
// };

// export default HolyMetrics;
// export { MCQ, MCQShadow, YesOrNo };
