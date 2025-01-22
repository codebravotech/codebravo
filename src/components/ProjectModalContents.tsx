import cx from "classnames";
import {
  AnimatePresence,
  animateMini,
  motion,
  useIsPresent,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { HEADER_HEIGHT } from "../config";
import { useDisplay } from "../hooks/display";
import {
  ImageRefResolved,
  ModalAnimationPhase,
  ProjectObject,
  VideoRefResolved,
} from "../types/components";
import { animationPhaseIn } from "../utils/animation";
import Header from "./Header";
import ProjectModalBodyPrivate from "./ProjectModalBodyPrivate";
import ProjectModalBodyPublic from "./ProjectModalBodyPublic";
import VideoBlockFullscreen from "./VideoBlockFullscreen";

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
  // const [videoLoaded, setVideoLoaded] = useState();
  const headerRef = useRef<HTMLDivElement>();
  const headerHeightRef = useRef<number>(0);
  const imageRef = useRef<HTMLElement>();
  const imageHeightRef = useRef<number>(0);
  // Animate out
  const handleClose = async () => {
    if (animationPhase === "MODAL_OPEN") {
      // STEP 4: MODAL CONTENTS START TO DO EXIT ANIMATION
      setAnimationPhase("MODAL_CONTENTS_EXITING");
    }
    // if (video) {
    //   }
    // } else {
    //   setAnimationPhase("CARD_SCALING_CLOSED");
    // }
  };

  const { isPortrait } = useDisplay();

  const { _id, header, private: isPrivate } = project;
  const videos = project.videos || ([] as VideoRefResolved[]);
  const thumbnails = project.thumbnails || ([] as ImageRefResolved[]);
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
    <motion.div className="absolute bottom-0 left-0 right-0 top-0 overflow-y-scroll overscroll-none bg-night-gradient scrollbar-hide">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
        animate={
          animationPhaseIn(["MODAL_OPEN"], animationPhase)
            ? "visible"
            : "hidden"
        }
        onAnimationComplete={() => {
          if (!video) {
            console.log("ANIMATION COMPLETE: HEADER");
            // if (animationPhase === "MODAL_CONTENTS_ENTERING") {
            //   setAnimationPhase("MODAL_OPEN");
            // }
          }
        }}
        transition={{ duration: 0.5 }}
        className={cx(
          "relative z-20",
          // animationPhase === "MODAL_OPEN" ? "visible" : "invisible",
        )}
      >
        <Header
          isHomePage={false}
          isPortfolio={true}
          clickedCurrentRoute={handleClose}
        />
        <div className="relative flex justify-center">
          <div className="underline-drawn relative font-fjalla text-3xl">
            {header?.toUpperCase()}
          </div>
        </div>
      </motion.div>

      {video && (
        // Invisible video to start load while animation is running */}
        <VideoBlockFullscreen
          key={`project_${_id}_loader_video`}
          video={video}
          thumbnail={thumbnail}
          // setVideoLoaded={setVideoLoaded}
          className={cx("absolute hidden")}
        />
      )}
      {!video && thumbnailUrl && (
        // NON-VIDEO MODAL IMAGE FOR DURING THE ANIMATION
        <motion.img
          ref={imageRef}
          key={`project_${_id}_no_video_thumbnail`}
          src={`${thumbnailUrl}?w=${innerWidth}&fit=clip&auto=format`}
          onClick={handleClose}
          className={cx(
            "absolute bottom-0 left-0 right-0 top-0 h-full w-full",
            roundingClass,
          )}
          initial={{ y: 0 }}
          variants={{
            modalOpen: {
              y: headerRef?.current?.getBoundingClientRect()?.height,
            },
            modalClosed: { y: 0 },
          }}
          animate={
            animationPhaseIn(
              ["MODAL_CONTENTS_ENTERING", "MODAL_OPEN"],
              animationPhase,
            )
              ? "modalOpen"
              : "modalClosed"
          }
          onAnimationComplete={() => {
            if (animationPhase === "MODAL_CONTENTS_ENTERING") {
              setAnimationPhase("MODAL_OPEN");
            }
            if (animationPhase === "MODAL_CONTENTS_EXITING") {
              setAnimationPhase("CARD_SCALING_CLOSED");
            }
          }}
          transition={{ duration: 0.5 }}
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
                y: isPortrait ? "-10%" : 0,
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
        <>
          {isPrivate ? (
            <ProjectModalBodyPrivate
              project={project}
              animationPhase={animationPhase}
            />
          ) : (
            <ProjectModalBodyPublic
              project={project}
              animationPhase={animationPhase}
            />
          )}
        </>
      )}
    </motion.div>
  );
}

/*  */
