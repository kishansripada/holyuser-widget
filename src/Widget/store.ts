import { create } from "zustand";
import { deployment } from "@/typesandconst";

interface Store {
   initialized: boolean;
   setInitialized: (value: boolean) => void;

   activeDeployments: { [key: string]: false | string };
   setActiveDeployments: (id: string, value: false | string) => void;

   messages: any[];
   setMessages: (polls: any[]) => void;

   deployments: deployment[];
   setDeployments: (deployments: deployment[]) => void;

   userWithCookies: dbUser;
   setUserWithCookies: (dbUser: dbUser) => void;

   audiences: any[];
   setAudiences: (audiences: any[]) => void;

   userId: string;
   setUserId: (userId: string) => void;

   apiKey: string;
   setApiKey: (apiKey: string) => void;

   events: any[];
   setEvents: (events: any[]) => void;
}

export const useStore = create<Store>((set) => ({
   initialized: false,
   setInitialized: (value: boolean) => set({ initialized: value }),

   activeDeployments: {},
   setActiveDeployments: (id: string, value: false | string) => set((state) => ({ activeDeployments: { ...state.activeDeployments, [id]: value } })),

   messages: [],
   setMessages: (messages) => set({ messages }),

   deployments: [],
   setDeployments: (deployments) => set({ deployments }),

   audiences: [],
   setAudiences: (audiences) => set({ audiences }),

   userWithCookies: {},
   setUserWithCookies: (userWithCookies) => set({ userWithCookies }),

   apiKey: "",
   setApiKey: (apiKey) => set({ apiKey }),

   userId: "",
   setUserId: (userId) => set({ userId }),

   events: [],
   setEvents: (events) => set({ events }),
}));
