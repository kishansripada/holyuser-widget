import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Poll from "./ShouldShow/Poll";
import { create } from "zustand";
import { dbUser, setHolyCookie, updateOrAddUserInDb } from "@/typesandconst";

const supabase = createClient(
   "https://cmdpjhmqoqpkfwxqdekb.supabase.co",
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZHBqaG1xb3Fwa2Z3eHFkZWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzMTY5MTAsImV4cCI6MjAyMTg5MjkxMH0.YhScL14jXQKyzFIAsIh9y3tujE0metKzw_N4Gwhnezg"
);
interface Store {
   visiblityMap: {};
   setVisibilityMap: (id: string, value: boolean) => void;

   polls: any[];
   setPolls: (polls: any[]) => void;

   dbUser: dbUser;
   setDbUser: (dbUser: dbUser) => void;

   userId: string;
   setUserId: (userId: string) => void;

   apiKey: string;
   setApiKey: (apiKey: string) => void;
}

const useStore = create<Store>((set) => ({
   visiblityMap: {},
   setVisibilityMap: (id: string, value: boolean) => set((state) => ({ visiblityMap: { ...state.visiblityMap, [id]: value } })),

   polls: [],
   setPolls: (polls) => set({ polls }),

   dbUser: {},
   setDbUser: (dbUser) => set({ dbUser }),

   apiKey: "",
   setApiKey: (apiKey) => set({ apiKey }),

   userId: "",
   setUserId: (userId) => set({ userId }),
}));

function Embed({ user, userId, apiKey, darkMode }: { user: any; userId: string; apiKey: string; darkMode?: boolean }) {
   const { setVisibilityMap, setPolls, polls, setDbUser } = useStore();

   const getMyPolls = async (apiKey: string) => {
      const { data: activeAppPolls } = await supabase.from("polls").select("*").eq("app_id", apiKey);

      return activeAppPolls || [];
   };

   const getUserAndPolls = async () => {
      if (!userId || !apiKey) return;

      const [dbUser, polls] = await Promise.all([
         // update user without cookies
         updateOrAddUserInDb(apiKey, userId, user),
         getMyPolls(apiKey),
      ]);

      console.log(dbUser);
      // reset cookies to what's in DB
      setHolyCookie(dbUser.cookies);

      // update user with cookies
      setDbUser(dbUser);
      setPolls(polls);
   };

   useEffect(() => {
      getUserAndPolls();
   }, []);

   if (!userId || !apiKey) return <></>;

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
