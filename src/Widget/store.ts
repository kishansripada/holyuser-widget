import { create } from "zustand";

interface Store {
   activeDeployments: {};
   setActiveDeployments: (id: string, value: boolean) => void;

   polls: any[];
   setPolls: (polls: any[]) => void;

   deployments: any[];
   setDeployments: (deployments: any[]) => void;

   dbUser: dbUser;
   setDbUser: (dbUser: dbUser) => void;

   userId: string;
   setUserId: (userId: string) => void;

   apiKey: string;
   setApiKey: (apiKey: string) => void;
}

export const useStore = create<Store>((set) => ({
   activeDeployments: {},
   setActiveDeployments: (id: string, value: boolean) => set((state) => ({ activeDeployments: { ...state.activeDeployments, [id]: value } })),

   polls: [],
   setPolls: (polls) => set({ polls }),

   deployments: [],
   setDeployments: (deployments) => set({ deployments }),

   dbUser: {},
   setDbUser: (dbUser) => set({ dbUser }),

   apiKey: "",
   setApiKey: (apiKey) => set({ apiKey }),

   userId: "",
   setUserId: (userId) => set({ userId }),
}));
