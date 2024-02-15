import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";

import YesOrNo from "./Widget/Questions/YesOrNo";
import HolyMetrics from "../lib/index";
// const supabase = createClient(
//    "https://cmdpjhmqoqpkfwxqdekb.supabase.co",
//    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZHBqaG1xb3Fwa2Z3eHFkZWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzMTY5MTAsImV4cCI6MjAyMTg5MjkxMH0.YhScL14jXQKyzFIAsIh9y3tujE0metKzw_N4Gwhnezg"
// );
function App() {
   // const [myPolls, setMyPolls] = useState([]);

   // useEffect(() => {
   //    supabase
   //       .from("polls")
   //       .select("*")
   //       .then((res) => {
   //          setMyPolls(res.data);
   //       });
   // }, []);

   return (
      <div className="dark grid grid-cols-2 gap-10 px-16 py-32">
         {/* {myPolls.map((poll) => {
            return (
               <div
                  key={poll.id}
                  className=" overflow-hidden select-none  w-[500px] h-min rounded-lg border  dark:border-neutral-700 border-neutral-300"
               >
                  <YesOrNo sendResponse={() => null} poll={poll} />
               </div>
            );
         })} */}

         <HolyMetrics
            userId="f30197ba-cf06-4234-bcdb-5d40d83c7999"
            user={{
               name: "Kishan",
            }}
            apiKey="7599296f-6f69-4673-8b16-cfca049582fb"
         ></HolyMetrics>
      </div>
   );
}

export default App;
