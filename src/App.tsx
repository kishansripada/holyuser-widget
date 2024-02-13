import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import YesOrNo from "./Widget/Questions/YesOrNo";
import MCQ from "./Widget/Questions/MCQ";

function App() {
   const [myPolls, setMyPolls] = useState([]);
   const supabase = createClient(
      "https://cmdpjhmqoqpkfwxqdekb.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZHBqaG1xb3Fwa2Z3eHFkZWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzMTY5MTAsImV4cCI6MjAyMTg5MjkxMH0.YhScL14jXQKyzFIAsIh9y3tujE0metKzw_N4Gwhnezg"
   );

   useEffect(() => {
      supabase
         .from("polls")
         .select("*")
         .then((res) => {
            setMyPolls(res.data);
         });
   }, []);

   const DUMMY_USER = {
      id: "testid",
      name: "testname",
      created_at: new Date(),
      // (new Date() - new Date(user.created_at)) > (7 * 24 * 60 * 60 * 1000)
      selectedUses: ["Cheer"],
   };
   console.log({ myPolls });
   return (
      <div className="dark grid grid-cols-2 gap-10 px-16 py-32">
         {myPolls.map((poll) => {
            return poll.poll_data.type === "mcq" ? (
               <div className=" overflow-hidden select-none  w-[500px] min-h-[100px] rounded-lg border  dark:border-neutral-700 border-neutral-300">
                  <MCQ sendResponse={() => null} poll={poll} />
               </div>
            ) : (
               <div className=" overflow-hidden select-none  w-[500px] h-min rounded-lg border  dark:border-neutral-700 border-neutral-300">
                  <YesOrNo sendResponse={() => null} poll={poll} />
               </div>
            );
         })}
      </div>
   );
}

export default App;
