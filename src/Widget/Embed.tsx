import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Poll from "./ShouldShow/Poll";
import { create } from "zustand";

const supabase = createClient(
   "https://cmdpjhmqoqpkfwxqdekb.supabase.co",
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZHBqaG1xb3Fwa2Z3eHFkZWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzMTY5MTAsImV4cCI6MjAyMTg5MjkxMH0.YhScL14jXQKyzFIAsIh9y3tujE0metKzw_N4Gwhnezg"
);
interface Store {
   visiblityMap: {};
   setVisibilityMap: (id: string, value: boolean) => void;

   polls: any[];
   setPolls: (polls: any[]) => void;

   dbUser: any;
   setDbUser: (dbUser: any) => void;
}

const useStore = create<Store>((set) => ({
   visiblityMap: {},
   setVisibilityMap: (id: string, value: boolean) => set((state) => ({ visiblityMap: { ...state.visiblityMap, [id]: value } })),

   polls: [],
   setPolls: (polls) => set({ polls }),

   dbUser: {},
   setDbUser: (dbUser) => set({ dbUser }),
}));

function Embed({ user, userId, apiKey, darkMode }: { user: any; userId: string; apiKey: string; darkMode?: boolean }) {
   const visiblityMap = useStore((state) => state.visiblityMap);
   const setVisibilityMap = useStore((state) => state.setVisibilityMap);

   const setPolls = useStore((state) => state.setPolls);
   const polls = useStore((state) => state.polls);

   const setDbUser = useStore((state) => state.setDbUser);

   const getMyPolls = async () => {
      const { data: activeAppPolls } = await supabase.from("polls").select("*").eq("app_id", apiKey);

      return activeAppPolls;
   };

   const addUser = async () => {
      const dbUser = await supabase
         .from("sample_data")
         .upsert([{ app_id: apiKey, user_id: userId, user }])
         .select("*");

      setDbUser(dbUser);

      // set holyuser cookie to user.dbUser.cookies
      document.cookie = `${"holy-user"}=${encodeURIComponent(JSON.stringify(user.cookies))}; path=/`;
   };

   useEffect(() => {
      if (!userId || !apiKey) return;

      addUser();

      getMyPolls().then((res) => {
         setPolls(res);
      });
   }, []);

   if (!userId || !apiKey) return <></>;

   // return <></>;
   return (
      <div className={`${darkMode ? "dark" : ""}`}>
         {polls.map((poll) => {
            return (
               <Poll
                  visiblityMap={visiblityMap}
                  setVisibilityMap={setVisibilityMap}
                  supabase={supabase}
                  key={poll.id}
                  userId={userId}
                  user={user}
                  poll={poll}
               />
            );
         })}
      </div>
   );
}

export { Embed, useStore };
