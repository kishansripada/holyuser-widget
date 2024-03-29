import { createClient } from "@supabase/supabase-js";

export type dbUser = {
   id: string;
   created_at: string;
   app_id: string;
   user_id: string;
   user: any;
   cookies: Record<string, number>;
};

export type poll = {
   id: number;
   created_at: Date;
   title?: string | null;
   user_id: string | null;
   poll_data: Record<string, any>;
   active: boolean;
   app_id: string;
};

export type deployment = {
   id: string;
   created_at: Date;
   data_tree: any;
   is_live: boolean;
   app_id: string;
   name: string;
};

export const COOKIE_NAME = "hyperuser";

export const supabase = createClient(
   "https://cmdpjhmqoqpkfwxqdekb.supabase.co",
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZHBqaG1xb3Fwa2Z3eHFkZWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzMTY5MTAsImV4cCI6MjAyMTg5MjkxMH0.YhScL14jXQKyzFIAsIh9y3tujE0metKzw_N4Gwhnezg"
);

export const setHolyCookie = (cookieObject: dbUser["cookies"]) => {
   if (!cookieObject) return;
   document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(cookieObject))}; path=/`;
};

export const pushCookies = async (apiKey: string, userId: string, cookies: dbUser["cookies"]) => {
   const dbUser = await supabase
      .from("sample_data")
      .upsert([{ app_id: apiKey, user_id: userId, cookies }])
      .select("*")
      .single();

   return dbUser.data;
};
