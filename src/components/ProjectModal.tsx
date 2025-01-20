import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { pick } from "lodash";
import { useEffect, useState } from "react";

import { useDisplay } from "../hooks/display";
// import { useIsElementOnScreen } from "../hooks/display";
import { useSystemStore } from "../state/system";
import { ModalAnimationPhase, ProjectObject } from "../types/components";
import { animationPhaseIn } from "../utils/animation";
import ProjectModalContents from "./ProjectModalContents";

export default function ProjectModal({ project }: { project: ProjectObject }) {
  const { setOpenProjectId, clickedCardBoundingBox } = useSystemStore();
  const { isPortrait } = useDisplay();
  const [animationPhase, updateAnimationPhase] =
    useState<ModalAnimationPhase>("MODAL_CLOSED");
  const setAnimationPhase = (animationPhase: ModalAnimationPhase) => {
    updateAnimationPhase(animationPhase);
  };
  const roundingClass = "rounded-2xl";

  // Animate in
  useEffect(() => {
    // STEP 1 -- CARD SCALING UP ANIMATION BEGINS
    setAnimationPhase("CARD_SCALING_OPEN");
  }, []);

  const { _id, thumbnails = [], videos = [] } = project;
  const thumbnail =
    thumbnails?.find(
      (elem) => elem.orientation === (isPortrait ? "portrait" : "landscape"),
    ) || thumbnails?.find((elem) => elem.asset.url);
  const video =
    videos?.find(
      (elem) => elem.orientation === (isPortrait ? "portrait" : "landscape"),
    ) || videos?.find((elem) => elem.asset.url);

  if (!clickedCardBoundingBox || !thumbnail) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key={`project_${_id}_modal`}
        className={cx(
          "fixed z-10 overscroll-none bg-stars-100 scrollbar-hide",
          animationPhaseIn(
            ["MODAL_CLOSED", "CARD_SCALING_OPEN", "CARD_SCALING_CLOSED"],
            animationPhase,
          ) && roundingClass,
        )}
        layout
        style={
          animationPhaseIn(
            ["MODAL_CLOSED", "CARD_SCALING_CLOSED"],
            animationPhase,
          )
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
            duration: 0.5,
            ease: "easeIn",
          },
        }}
        onLayoutAnimationComplete={() => {
          // STEP 2: CARD FINISHES SCALING UP, MODAL CONTENTS DO ENTER ANIMATION
          if (animationPhase === "CARD_SCALING_OPEN") {
            if (video) {
              setAnimationPhase("MODAL_CONTENTS_ENTERING");
            } else {
              setAnimationPhase("MODAL_OPEN");
            }
          } else if (animationPhase === "CARD_SCALING_CLOSED") {
            setAnimationPhase("MODAL_CLOSED");
            setOpenProjectId(null);
          }
        }}
      >
        <ProjectModalContents
          project={project}
          animationPhase={animationPhase}
          setAnimationPhase={setAnimationPhase}
          roundingClass={roundingClass}
        />
      </motion.div>
    </AnimatePresence>
  );
}
