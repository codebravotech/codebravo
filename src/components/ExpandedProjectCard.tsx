import cx from "classnames";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { useProjectThumbnail } from "../hooks/documents";
import { ProjectDocument } from "../types/components";

export default function ExpandedProjectCard({
  project,

  className = "",
  handleClose,
}: {
  project: ProjectDocument;

  handleClose: () => void;
  className?: string;
}) {
  const timeout = useRef<NodeJS.Timeout>();
  const thumbnail = useProjectThumbnail(project);
  const [modalOpen, setModalOpen] = useState(false);
  const { _id } = project;

  useEffect(() => {
    // CYA for if layout animation callback doesn't fire (seen occasionally on mobile in prod)
    timeout.current = setTimeout(() => {
      setModalOpen(true);
    }, 3000);

    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  return (
    <motion.div
      className={cx(
        "relative overflow-x-hidden overflow-y-scroll rounded bg-white p-4 shadow-lg",
        className,
      )}
      id="expanded_proj_card"
      layout
      key={`project_expanded_card_${_id}`}
      layoutId={`layout_sibling_card_${_id}`}
      onLayoutAnimationComplete={() => {
        setTimeout(() => {
          if (timeout.current) {
            clearTimeout(timeout.current);
          }
          setModalOpen(true);
        }, 100);
      }}
      transition={{ duration: 0.7, ease: "easeIn" }}
      style={{ height: "100vh", width: "100vw" }}
    >
      <div>MODAL IS OPEN? V5 {modalOpen.toString()}</div>
      <div onClick={handleClose}>CLOSE</div>
      <img
        src={thumbnail?.asset?.url}
        alt={project.title}
        className={cx("h-full w-full rounded object-cover")}
      />
    </motion.div>
  );
}
