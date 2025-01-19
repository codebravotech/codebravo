import cx from "classnames";
import { motion } from "framer-motion";
import { useRef } from "react";

import { useSystemStore } from "../state/system";
import { ProjectObject } from "../types/components";

export default function ProjectCard({ project }: { project: ProjectObject }) {
  const { openProjectId, setOpenProjectId, setClickedCardBoundingBox } =
    useSystemStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const {
    _id,
    thumbnailAsset: { url = "" },
    thumbnailAlt = "",
    thumbnail_overlay_color = "",
  } = project;
  const isOpen = openProjectId === _id;

  // We use state and then an effect to turn off the hover so that the bounding box will be the right size and not
  // stretch the ProjectModal that will render and grows based on the "openProjectId"
  const onClick = async () => {
    if (cardRef.current) {
      const boundingBox = cardRef.current.getBoundingClientRect();
      setClickedCardBoundingBox(boundingBox);
      setOpenProjectId(_id);
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.7 },
    },
  };
  const roundingClass = "rounded-2xl";

  return (
    <motion.div
      ref={cardRef}
      whileHover="hover"
      className={cx(
        "relative grow-0 basis-[47%] cursor-pointer overflow-hidden bg-transparent",
        roundingClass,
        isOpen && "invisible",
      )}
      onClick={onClick}
      onTap={onClick}
    >
      {/* Image */}
      <motion.img
        src={url}
        alt={thumbnailAlt}
        className="h-full w-full object-contain"
        variants={imageVariants}
      />

      {/* Overlay */}
      <motion.div
        className={cx(
          `absolute inset-0 flex h-full w-full flex-col items-center justify-center hover:!bg-transparent`,
          roundingClass,
        )}
        style={{
          backgroundColor: thumbnail_overlay_color,
          mixBlendMode: "multiply",
        }}
      ></motion.div>
      {/* Content */}
      <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center text-2xl text-stars-100">
        I AM THE CARD
      </div>
    </motion.div>
  );
}
