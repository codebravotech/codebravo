import { create } from "zustand";

export interface SystemState {
  openProjectId: string | null;
  setOpenProjectId: (openProjectId: string | null) => void;

  token: string | null;
  setToken: (token: string | null) => void;
}

export const useSystemStore = create<SystemState>()((set /*, get*/) => ({
  token: null,
  setToken: (token) => set({ token }),
  openProjectId: null,
  setOpenProjectId: (openProjectId) => set({ openProjectId }),
}));
