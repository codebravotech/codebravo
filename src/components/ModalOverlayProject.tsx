import { motion } from "framer-motion";

import { ProjectDocument } from "../types/components";
import ExpandedProjectCard from "./ExpandedProjectCard";

export default function ModalOverlayProject({
  project,
  handleClose,
}: {
  project: ProjectDocument | undefined;
  handleClose: () => void;
}) {
  if (!project) {
    return null;
  }
  const { _id } = project;

  return (
    <motion.div
      id="MODAL_OVERLAY"
      key={`project_modal_overlay_${_id}`}
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center"
    >
      <ExpandedProjectCard project={project} handleClose={handleClose} />
    </motion.div>
  );
}
