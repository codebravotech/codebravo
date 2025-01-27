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
  console.log("MODAL LAYOUT ID: ", project?._id);

  if (!project) {
    return null;
  }
  const { _id } = project;

  return (
    <motion.div
      id="MODAL_OVERLAY"
      key="modal-overlay"
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center overscroll-none"
    >
      <motion.div
        layout
        layoutId={_id}
        onLayoutAnimationComplete={() => {
          alert("DONE WITH MODAL OPEN LAYOUT");
          console.log("DONE ANIMATING LAYOUT ENTRY");
        }}
        className="relative h-[100vh] w-[100vw] overflow-x-hidden overflow-y-scroll overscroll-none rounded bg-white p-4 shadow-lg scrollbar-hide"
      >
        <ExpandedProjectCard
          project={project}
          handleClose={handleClose}
          // modalOpen={false}
        />
      </motion.div>
    </motion.div>
  );
}
