import { ModalAnimationPhase } from "../types/components";

export const animationPhaseIn = (
  listToCheck: ModalAnimationPhase[],
  animationPhase: ModalAnimationPhase,
) => {
  return listToCheck.indexOf(animationPhase) !== -1;
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};
