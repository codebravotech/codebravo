import { create } from "zustand";

import {
  ModalAnimationPhase,
  PortfolioPageDocument,
} from "../types/components";

export interface SystemState {
  token: string | null;
  setToken: (token: string | null) => void;

  portfolioPage: PortfolioPageDocument | null;
  setPortfolioPage: (portfolioPage: PortfolioPageDocument | null) => void;

  animationPhase: ModalAnimationPhase;
  setAnimationPhase: (token: ModalAnimationPhase) => void;
}

export const useSystemStore = create<SystemState>()((set /*, get*/) => ({
  token: null,
  setToken: (token) => set({ token }),

  portfolioPage: null,
  setPortfolioPage: (portfolioPage) => set({ portfolioPage }),

  animationPhase: "MODAL_CLOSED",
  setAnimationPhase: (animationPhase) => set({ animationPhase }),
}));
