import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { pick } from "lodash";
import { useEffect, useState } from "react";

// import { useIsElementOnScreen } from "../hooks/display";
import { useSystemStore } from "../state/system";
import { ProjectObject } from "../types/components";

export default function ProjectModal({ project }: { project: ProjectObject }) {
  const { setOpenProjectId, clickedCardBoundingBox } = useSystemStore();
  // const isOnScreen = useIsElementOnScreen(`project_card_${project?._id}`);

  const [didRenderModalCard, setDidRenderModalCard] = useState(false);
  const [didAnimateOpen, setDidAnimateOpen] = useState(false);
  const transitionDuration = 0.3;
  const transitionDurationMs = transitionDuration * 1000;
  const contentsDuration = 0.3;
  const contentsDurationMs = contentsDuration * 1000;

  const {
    _id,
    thumbnailAsset: { url = "" },
    thumbnailAlt = "",
  } = project;

  // Animate in
  useEffect(() => {
    let animationTimeout = null;
    setDidRenderModalCard(true);

    if (clickedCardBoundingBox) {
      animationTimeout = setTimeout(() => {
        setDidAnimateOpen(true);
      }, transitionDuration);
    }

    return () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
    };
  }, []);

  // Animate out
  const handleClose = async () => {
    const card = document.getElementById(`project_card_${project?._id}`);

    const rect = card?.getBoundingClientRect();
    if (rect) {
      const y = rect.top + window.scrollY - 250;
      setTimeout(() => {
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 200);
    }

    setDidAnimateOpen(false);
    setTimeout(() => {
      setDidRenderModalCard(false);
      setTimeout(() => {
        setOpenProjectId(null);
      }, transitionDurationMs);
    }, contentsDurationMs * 2);
  };

  if (!clickedCardBoundingBox) {
    return null;
  }

  const roundingClass = "rounded-2xl";

  return (
    <AnimatePresence>
      <motion.div
        key={`project_${_id}_modal`}
        className={cx(
          "fixed z-10 cursor-pointer overscroll-none bg-stars-100 scrollbar-hide",
          !didAnimateOpen && roundingClass,
        )}
        onClick={handleClose}
        onTap={handleClose}
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
        {/* Image */}
        <AnimatePresence mode="wait">
          {!didAnimateOpen ? (
            <motion.img
              key={`project_${_id}_modal_img`}
              src={`${url}?w=${innerWidth}&fit=clip&auto=format`}
              alt={thumbnailAlt}
              className={cx("h-full w-full", !didAnimateOpen && roundingClass)}
              initial={didRenderModalCard ? { opacity: 0 } : {}}
              animate={
                didRenderModalCard
                  ? {
                      opacity: 1,
                      transition: { duration: contentsDuration / 2 },
                    }
                  : {}
              }
              exit={{
                opacity: 0,
                transition: {
                  delay: transitionDuration,
                  duration: contentsDuration,
                },
              }}
            />
          ) : (
            <motion.div
              key={`project_${_id}_contents`}
              className="flex h-full w-full flex-row items-center justify-center bg-dune-100"
              initial={{ opacity: 0, y: -100 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: contentsDuration },
              }}
              exit={{
                opacity: 0,
                y: -100,
                transition: { duration: contentsDuration },
              }}
            >
              HELLO WORLD
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
