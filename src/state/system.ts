import { create } from "zustand";

import { ModalAnimationPhase } from "../types/components";

export interface SystemState {
  openProjectId: string | null;
  setOpenProjectId: (openProjectId: string | null) => void;

  token: string | null;
  setToken: (token: string | null) => void;

  animationPhase: ModalAnimationPhase;
  setAnimationPhase: (token: ModalAnimationPhase) => void;
}

export const useSystemStore = create<SystemState>()((set /*, get*/) => ({
  token: null,
  setToken: (token) => set({ token }),
  openProjectId: null,
  setOpenProjectId: (openProjectId) => set({ openProjectId }),

  animationPhase: "MODAL_CLOSED",
  setAnimationPhase: (animationPhase) => set({ animationPhase }),
}));
