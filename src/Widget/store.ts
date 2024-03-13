import { create } from "zustand";
import { deployment } from "@/typesandconst";

interface Store {
   activeDeployments: {};
   setActiveDeployments: (id: string, value: boolean) => void;

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
}

export const useStore = create<Store>((set) => ({
   activeDeployments: {},
   setActiveDeployments: (id: string, value: boolean) => set((state) => ({ activeDeployments: { ...state.activeDeployments, [id]: value } })),

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
}));