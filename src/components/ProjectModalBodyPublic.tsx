import { motion } from "framer-motion";

import { ModalAnimationPhase, ProjectDocument } from "../types/components";

export default function ProjectModalBodyPublic({
  project,
  animationPhase,
}: {
  project: ProjectDocument;
  animationPhase: ModalAnimationPhase;
}) {
  return <motion.div className=""></motion.div>;
}
