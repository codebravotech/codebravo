import { ModalAnimationPhase } from "../types/components";

export const animationPhaseIn = (
  listToCheck: ModalAnimationPhase[],
  animationPhase: ModalAnimationPhase,
) => {
  return listToCheck.indexOf(animationPhase) !== -1;
};
