import { motion } from "framer-motion";

import { ModalAnimationPhase, ProjectObject } from "../types/components";

export default function ProjectModalBodyPublic({
  project,
  animationPhase,
}: {
  project: ProjectObject;
  animationPhase: ModalAnimationPhase;
}) {
  return <motion.div className="mt-[200vh]"></motion.div>;
}
