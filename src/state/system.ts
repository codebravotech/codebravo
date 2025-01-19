import { create } from "zustand";

export interface SystemState {
  openProjectId: string | null;
  setOpenProjectId: (openProjectId: string | null) => void;

  clickedCardBoundingBox: DOMRect | null;
  setClickedCardBoundingBox: (clickedCardBoundingBox: DOMRect) => void;

  hideAppOverflow: boolean;
  setHideAppOverflow: (hideAppOverflow: boolean) => void;
}

export const useSystemStore = create<SystemState>()((set /*, get*/) => ({
  openProjectId: null,
  setOpenProjectId: (openProjectId) => set({ openProjectId }),
  clickedCardBoundingBox: null,
  setClickedCardBoundingBox: (clickedCardBoundingBox) =>
    set({ clickedCardBoundingBox }),

  hideAppOverflow: false,
  setHideAppOverflow: (hideAppOverflow) => set({ hideAppOverflow }),
}));
