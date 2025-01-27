import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { useProjectThumbnail, useProjectVideo } from "../hooks/documents";
import { useSystemStore } from "../state/system";
import { ProjectDocument } from "../types/components";
import { animationPhaseIn } from "../utils/animation";
import Icon from "./Icon";
import PortableTextRegular from "./PortableTextRegular";
import VideoComponent from "./VideoComponent";

export default function ExpandedProjectCard({
  project,

  className = "",
}: {
  project: ProjectDocument;
  className?: string;
}) {
  // const timeout = useRef<NodeJS.Timeout>();
  const thumbnail = useProjectThumbnail(project);
  const video = useProjectVideo(project);
  const hasVideo = !!video?.asset?.url;

  const { animationPhase, setAnimationPhase, setOpenProjectId } =
    useSystemStore();
  // const [modalOpen, setModalOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { _id, header } = project;

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const forceCloseModal = () => {
    setAnimationPhase("MODAL_CLOSED");
    setOpenProjectId(null);
  };

  // useEffect(() => {
  // CYA for if layout animation callback doesn't fire (seen occasionally on mobile in prod)
  // timeout.current = setTimeout(() => {
  //   setAnimationPhase("MODAL_OPEN");
  // }, 3000);

  // return () => {
  // clearTimeout(timeout.current);
  // };
  // }, []);

  const handleRequestClose = () => {
    // Control the layout effect! This might need to be moved elsewhere for
    // the multi-step animation
    if (animationPhase === "MODAL_OPEN") {
      setAnimationPhase("MODAL_CONTENTS_EXITING");
    } else {
      alert("FORCE CLOSED!");
      // Make sure people never get stuck if they click around too fast
      forceCloseModal();
    }
  };

  const handleFinishedCrossfade = () => {
    if (animationPhase === "MODAL_CONTENTS_ENTERING") {
      console.log("OPENING MODAL!!!!!!!!!!!!!!!!!!");
      setAnimationPhase("MODAL_OPEN");
    } else if (animationPhase === "MODAL_CONTENTS_EXITING") {
      console.log("CLOSING MODAL!!!!!!!!!!!!!!!!!!");
      setAnimationPhase("CARD_SCALING_CLOSED");
      setOpenProjectId(null);
    }
  };

  console.log("HAS VIDEO: ", hasVideo.toString());

  return (
    <motion.div
      className={cx(
        "relative overflow-x-hidden overflow-y-scroll rounded bg-night-gradient bg-white text-stars-100 shadow-lg",
        className,
      )}
      id="expanded_proj_card"
      layout
      key={`project_expanded_card_${_id}`}
      layoutId={`layout_sibling_card_${_id}`}
      onLayoutAnimationComplete={() => {
        console.log(
          "CARD SCALE UP LAYOUT ANIMATION COMPLETED! PHASE: ",
          animationPhase,
        );
        // Wrapping this in a brief timeout seems to help it consistently fire the effect
        // on mobile. This handler effect only fires on the arriving animation one, so the corresponding one for "CARD_SCALING_CLOSED" is in the layoutId partner
        setTimeout(() => {
          if (animationPhase === "CARD_SCALING_OPEN") {
            setAnimationPhase("MODAL_CONTENTS_ENTERING");
          }
        }, 10);
      }}
      transition={{ duration: 0.7, ease: "easeIn", delay: 1 }}
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className="relative flex justify-center pt-10">
        <div className="underline-drawn relative mb-2 flex items-center text-center font-fjalla text-5xl">
          <PortableTextRegular content={header} />
        </div>

        <div className="ml-4 flex flex-col justify-center text-stars-100 hover:scale-150">
          <Icon
            className={cx(
              "h-6 w-6",
              animationPhase !== "MODAL_OPEN" && "invisible",
            )}
            icon="back"
            onClick={handleRequestClose}
          />
        </div>
      </div>
      <div>
        ANIMATION PHASE: {animationPhase}. IS VIDEO? {hasVideo.toString()}
      </div>

      <AnimatePresence>
        {hasVideo &&
          !animationPhaseIn(
            ["MODAL_CLOSED", "CARD_SCALING_OPEN", "CARD_SCALING_CLOSED"],
            animationPhase,
          ) && (
            <motion.div
              key={`${_id}_modal_hero_video`}
              className="z-10"
              variants={fadeVariants}
              animate={
                // We show the video whenver have a loaded video in the modal transition in or modal open phases!
                hasVideo &&
                videoLoaded &&
                animationPhaseIn(
                  ["MODAL_CONTENTS_ENTERING", "MODAL_OPEN"],
                  animationPhase,
                )
                  ? "visible"
                  : "hidden"
              }
              transition={{ duration: 0.7, delay: 1 }}
              onAnimationComplete={() => {
                if (hasVideo) {
                  console.log(
                    "VIDEO ANIMATION COMPLETE, PHASE IS",
                    animationPhase,
                  );
                  handleFinishedCrossfade();
                }
              }}
            >
              <VideoComponent
                src={video?.asset.url}
                onLoadedData={() => setVideoLoaded(true)}
              />
            </motion.div>
          )}

        <motion.img
          key={`${_id}_modal_hero_image`}
          variants={fadeVariants}
          animate={
            !hasVideo ||
            (hasVideo && animationPhase !== "MODAL_OPEN" ? "visible" : "hidden")

            // animationPhaseIn(
            //   [
            //     "MODAL_CLOSED",
            //     "CARD_SCALING_OPEN",
            //     "MODAL_CONTENTS_ENTERING",
            //     "MODAL_CONTENTS_EXITING",
            //     "CARD_SCALING_CLOSED",
            //   ],
            //   animationPhase,
            // ))
          }
          // transition={{
          //   duration: animationPhaseIn(
          //     ["MODAL_OPEN", "MODAL_CONTENTS_EXITING"],
          //     animationPhase,
          //   )
          //     ? 0.7
          //     : 0.7,
          // }}
          transition={{
            duration: 1,
            delay: 1,
          }}
          src={thumbnail?.asset?.url}
          alt={project.title}
          onAnimationComplete={() => {
            if (!hasVideo) {
              console.log(
                "IMAGE ANIMATION COMPLETE, PHASE IS: ",
                animationPhase,
              );
              handleFinishedCrossfade();
            }
          }}
          className={cx("z-20 h-full w-full rounded object-contain")}
        />
      </AnimatePresence>
    </motion.div>
  );
}
