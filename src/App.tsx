import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import YesOrNo from "./Widget/Questions/YesOrNo";
const url = "https://holyuser-widget.vercel.app/holyuser.js";
import { RemoteComponent, createUseRemoteComponent } from "@paciolan/remote-component";
function App() {
   const [myPolls, setMyPolls] = useState([]);
   const supabase = createClient(
      "https://cmdpjhmqoqpkfwxqdekb.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZHBqaG1xb3Fwa2Z3eHFkZWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzMTY5MTAsImV4cCI6MjAyMTg5MjkxMH0.YhScL14jXQKyzFIAsIh9y3tujE0metKzw_N4Gwhnezg"
   );
   const [loading, err, Component] = createUseRemoteComponent(url, "customImportName");
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

   return (
      <div className="dark grid grid-cols-2 gap-10 px-16 py-32">
         {myPolls.map((poll) => {
            return (
               <div className=" overflow-hidden select-none  w-[500px] h-min rounded-lg border  dark:border-neutral-700 border-neutral-300">
                  <YesOrNo sendResponse={() => null} poll={poll} />
               </div>
            );
         })}
         <RemoteComponent url={url} />
      </div>
   );
}

export default App;
