import { PortableTextBlock } from "@portabletext/types";
import { motion } from "framer-motion";

import { ModalAnimationPhase, ProjectObject } from "../types/components";
import PortableTextRegular from "./PortableTextRegular";

export default function ProjectModalBodyPrivate({
  project,
  offset = 0,
}: {
  project: ProjectObject;
  offset?: number;
}) {
  const { private_project_summary } = project;
  return (
    <motion.div className="text-stars-100" style={{ marginTop: offset }}>
      <PortableTextRegular
        content={private_project_summary as PortableTextBlock[]}
      />
    </motion.div>
  );
}
