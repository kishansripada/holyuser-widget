import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import ShowPollWrapper from "./ShowPollWrapper";

type user = {
   id: string;
   email: string;
};

function Index({ user, userId, apiKey, darkMode }: { user: user; userId: string; apiKey: string; darkMode?: boolean }) {
   const [myPolls, setMyPolls] = useState([]);
   const supabase = createClient(
      "https://cmdpjhmqoqpkfwxqdekb.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZHBqaG1xb3Fwa2Z3eHFkZWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzMTY5MTAsImV4cCI6MjAyMTg5MjkxMH0.YhScL14jXQKyzFIAsIh9y3tujE0metKzw_N4Gwhnezg"
   );

   const getMyPolls = async () => {
      const { data: activeAppPolls } = await supabase.from("polls").select("*").eq("app_id", apiKey);

      return activeAppPolls;
   };

   const getSampleCount = async () => {
      const { count } = await supabase.from("sample_data").select("*", { count: "exact" }).eq("app_id", apiKey);
      return count;
   };

   const addSampleUser = async () => {
      // const { data, error } =
      await supabase.from("sample_data").upsert([{ app_id: apiKey, user_id: userId, user }]);
      // console.log(data);
   };

   useEffect(() => {
      if (!userId || !apiKey) return;
      getSampleCount().then((count) => {
         if ((count || 0) < 50) {
            addSampleUser();
         }
         getMyPolls().then((res) => {
            setMyPolls(res);
         });
      });
   }, []);

   if (!userId || !apiKey) return <></>;

   // return <></>;
   return (
      <div className={`${darkMode ? "dark" : ""}`}>
         {myPolls.map((poll) => {
            return <ShowPollWrapper key={poll.id} userId={userId} user={user} poll={poll} />;
         })}
      </div>
   );
}

export { Index };
