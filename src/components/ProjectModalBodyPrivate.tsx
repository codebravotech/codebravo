import { PortableTextBlock } from "@portabletext/types";
import { motion } from "framer-motion";

import { ModalAnimationPhase, ProjectObject } from "../types/components";
import PortableTextRegular from "./PortableTextRegular";

export default function ProjectModalBodyPrivate({
  project,
  animationPhase,
}: {
  project: ProjectObject;
  animationPhase: ModalAnimationPhase;
}) {
  const { private_project_summary } = project;
  return (
    <motion.div>
      <PortableTextRegular
        content={private_project_summary as PortableTextBlock[]}
      />
    </motion.div>
  );
}
