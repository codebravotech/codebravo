import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { pick } from "lodash";
import { useEffect, useState } from "react";

import { useDisplay } from "../hooks/display";
// import { useIsElementOnScreen } from "../hooks/display";
import { useSystemStore } from "../state/system";
import { ProjectObject } from "../types/components";
import ProjectModalContents from "./ProjectModalContents";

export default function ProjectModal({ project }: { project: ProjectObject }) {
  const { setOpenProjectId, clickedCardBoundingBox } = useSystemStore();
  const { isPortrait } = useDisplay();
  const [didRenderModalCard, setDidRenderModalCard] = useState(false);
  const [didAnimateOpen, setDidAnimateOpen] = useState(false);
  const transitionDuration = 0.5;
  const transitionDurationMs = transitionDuration * 1000;
  const roundingClass = "rounded-2xl";

  // Animate in
  useEffect(() => {
    let animationTimeout: NodeJS.Timeout;
    setDidRenderModalCard(true);

    if (clickedCardBoundingBox) {
      animationTimeout = setTimeout(() => {
        setDidAnimateOpen(true);
      }, transitionDurationMs);
    }

    return () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
    };
  }, []);

  // Animate out
  const handleClose = async () => {
    // const card = document.getElementById(`project_card_${project?._id}`);
    // const rect = card?.getBoundingClientRect();
    // if (rect) {
    //   const y = rect.top + window.scrollY - 250;
    //   setTimeout(() => {
    //     window.scrollTo({ top: y, behavior: "smooth" });
    //   }, 50);
    // }

    setDidAnimateOpen(false);
    setDidRenderModalCard(false);
    setTimeout(() => {
      setOpenProjectId(null);
    }, transitionDurationMs);
  };

  const { _id, thumbnails = [] } = project;
  const thumbnail =
    thumbnails.find(
      (elem) => elem.orientation === (isPortrait ? "portrait" : "landscape"),
    ) || thumbnails.find((elem) => elem.asset.url);

  if (!clickedCardBoundingBox || !thumbnail) {
    return null;
  }

  // const {
  //   asset: { url },
  //   alt,
  // } = thumbnail;

  return (
    <AnimatePresence>
      <motion.div
        key={`project_${_id}_modal`}
        className={cx(
          "fixed z-20 cursor-pointer overscroll-none bg-stars-100 scrollbar-hide",
          !didAnimateOpen && roundingClass,
        )}
        onClick={handleClose}
        layout
        style={
          !didRenderModalCard
            ? pick(clickedCardBoundingBox, [
                "top",
                "left",
                "right",
                "bottom",
                "width",
                "height",
              ])
            : {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100%",
                height: "100%",
              }
        }
        transition={{
          layout: {
            duration: transitionDuration,
          },
        }}
      >
        <ProjectModalContents
          project={project}
          handleClose={handleClose}
          didAnimateOpen={didAnimateOpen}
          roundingClass={roundingClass}
        />
      </motion.div>
    </AnimatePresence>
  );
}
