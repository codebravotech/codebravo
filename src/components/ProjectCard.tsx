import cx from "classnames";
import { motion } from "framer-motion";
import { useState } from "react";

import { ProjectObject } from "../types/components";

export default function ProjectCard({ project }: { project: ProjectObject }) {
  // const isClicked = useRef(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    _id,
    thumbnailAsset: { url = "" },
    thumbnailAlt = "",
    thumbnail_overlay_color = "",
  } = project;

  const roundingClass = "rounded-2xl";

  const onClick = async () => {
    setIsOpen(true);
  };

  const imageVariants = {
    hover: { scale: 1.05, transition: { duration: 0.7 } },
  };
  return (
    <motion.div
      key={_id}
      whileHover="hover"
      className={cx(
        "flex grow-0 basis-[47%] cursor-pointer flex-col items-center justify-center overflow-hidden bg-transparent",
        !isOpen && roundingClass,
        isOpen && "z-50",
      )}
      onClick={onClick}
      onTap={onClick}
      layout
      style={
        isOpen
          ? {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              overscrollBehavior: "",
            }
          : {
              position: "relative",
            }
      }
    >
      <motion.img
        src={url}
        alt={thumbnailAlt}
        className="h-full w-full"
        variants={imageVariants}
        style={isOpen ? { objectFit: "fill" } : { objectFit: "contain" }}
      />
      <motion.div
        className={cx(
          `absolute inset-0 h-full w-full hover:!bg-transparent`,
          !isOpen && roundingClass,
        )}
        style={{
          backgroundColor: thumbnail_overlay_color,
          mixBlendMode: "multiply",
        }}
      />
    </motion.div>
  );
}
