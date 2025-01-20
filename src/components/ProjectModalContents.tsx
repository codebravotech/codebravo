import cx from "classnames";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { useEffect, useState } from "react";

import { useDisplay } from "../hooks/display";
import {
  ModalAnimationPhase,
  ProjectObject,
  ResolvedImageRef,
  ResolvedVideoRef,
} from "../types/components";
import { animationPhaseIn } from "../utils/animation";
import Header from "./Header";
import VideoBlockFullscreen from "./VideoBlockFullscreen";

// const VideoContainer = ({
//   _id,
//   video,
//   thumbnail,
//   roundingClass,
//   animationPhase,
//   setAnimationPhase,
// }) => {
//   const videoIsPresent = useIsPresent();

//   useEffect(() => {
//     console.log("PRESENCE HAS CHANGED!!", { videoIsPresent, animationPhase });
//     // if()
//   }, [videoIsPresent]);

//   return (

//   );
// };

export default function ProjectModalContents({
  project,
  animationPhase,
  setAnimationPhase,
  roundingClass,
}: {
  project: ProjectObject;
  animationPhase: ModalAnimationPhase;
  setAnimationPhase: (animationPhase: ModalAnimationPhase) => void;
  roundingClass: string;
}) {
  // Animate out
  const handleClose = async () => {
    if (video) {
      if (animationPhase === "MODAL_OPEN") {
        // STEP 4: MODAL CONTENTS START TO DO EXIT ANIMATION
        setAnimationPhase("MODAL_CONTENTS_EXITING");
      }
    } else {
      setAnimationPhase("CARD_SCALING_CLOSED");
    }
  };

  const { isPortrait } = useDisplay();
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { _id } = project;
  const videos = project.videos || ([] as ResolvedVideoRef[]);
  const thumbnails = project.thumbnails || ([] as ResolvedImageRef[]);
  const video =
    videos.find(
      (elem) => elem.orientation === (isPortrait ? "portrait" : "landscape"),
    ) || videos.find((elem) => elem.asset.url);
  const thumbnail =
    thumbnails.find(
      (elem) => elem.orientation === (isPortrait ? "portrait" : "landscape"),
    ) || thumbnails.find((elem) => elem.asset.url);

  const thumbnailUrl = thumbnail?.asset?.url;
  const alt = thumbnail?.alt;

  return (
    <motion.div className="bg-night-gradient absolute bottom-0 left-0 right-0 top-0 overflow-y-scroll overscroll-none scrollbar-hide">
      <div
        className={cx(
          "relative z-20",
          !video && "bg-night-400/70",
          animationPhase === "MODAL_OPEN" ? "visible" : "invisible",
        )}
      >
        {
          <Header
            isHomePage={false}
            isPortfolio={true}
            clickedCurrentRoute={handleClose}
          />
        }
      </div>
      {video && (
        // Invisible video to start load while animation is running */}
        <VideoBlockFullscreen
          key={`project_${_id}_loader_video`}
          video={video}
          thumbnail={thumbnail}
          setVideoLoaded={setVideoLoaded}
          className={cx("absolute hidden")}
        />
      )}
      {!video && thumbnailUrl && (
        // NON-VIDEO HEADER IMAGE
        <motion.img
          src={`${thumbnailUrl}?w=${innerWidth}&fit=clip&auto=format`}
          // TODO TAKE THIS OUTTTT!!!
          onClick={() => setAnimationPhase("CARD_SCALING_CLOSED")}
          className={cx(
            "absolute bottom-0 left-0 right-0 top-0 h-full w-full",
            roundingClass,
          )}
          alt={alt}
        />
      )}

      {/* CROSS FADING VIDEO AND IMAGE ANIMATION */}
      {video && (
        <AnimatePresence
          mode="sync"
          onExitComplete={() => {
            if (animationPhase === "MODAL_CONTENTS_ENTERING") {
              setAnimationPhase("MODAL_OPEN");
            }
            if (animationPhase === "MODAL_CONTENTS_EXITING") {
              setAnimationPhase("CARD_SCALING_CLOSED");
            }
          }}
        >
          {animationPhaseIn(
            ["MODAL_CONTENTS_ENTERING", "MODAL_OPEN"],
            animationPhase,
          ) ? (
            <motion.div
              key={`project_${_id}_modal_video`}
              initial={{ scale: 1, y: 0 }}
              animate={{
                scale: 0.9,
                y: isPortrait ? "-10%" : "-5%",
                transition: { duration: 1, ease: "easeOut" },
              }}
              exit={{
                scale: 1,
                y: 0,
                transition: { duration: 1, ease: "easeIn" },
              }}
              className="flex h-screen w-screen items-center justify-center"
            >
              {/* Video that will actually display  */}
              <VideoBlockFullscreen
                video={video}
                thumbnail={thumbnail}
                setVideoLoaded={() => null}
                className={roundingClass}
              />
            </motion.div>
          ) : (
            <motion.img
              key={`project_${_id}_modal_img`}
              src={`${thumbnailUrl}?w=${innerWidth}&fit=clip&auto=format`}
              className={cx(
                "absolute bottom-0 left-0 right-0 top-0 h-full w-full",
                roundingClass,
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
              exit={{ opacity: 0, transition: { duration: 0.7 } }}
              alt={alt}
            />
          )}
        </AnimatePresence>
      )}

      {animationPhaseIn(["MODAL_OPEN"], animationPhase) && (
        <div className="">
          <div className="h-32">FILLER</div>
          <div className="h-32">FILLER</div>
          <div className="h-32">FILLER</div>
          <div className="h-32">FILLER</div>
          <div className="h-32">FILLER</div>
          <div className="h-32">FILLER</div>
          <div className="h-32">FILLER</div>
        </div>
      )}
    </motion.div>
  );
}

/*  */
