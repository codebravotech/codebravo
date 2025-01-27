import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useDisplay } from "../hooks/display";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const thumbnail = useProjectThumbnail(project);
  const video = useProjectVideo(project);
  const hasVideo = !!video?.asset?.url;
  const headerHeight = "10vh";
  const bodyOffset = "12vh";
  // const bodyOffset = 0;

  const { animationPhase, setAnimationPhase } = useSystemStore();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { isPortrait } = useDisplay();

  const { _id, header } = project;
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
    if (animationPhase === "MODAL_OPEN") {
      searchParams.delete("p");
      setSearchParams(searchParams);

      setAnimationPhase("MODAL_CONTENTS_EXITING");
    }
  };

  const handleFinishedCrossfade = () => {
    const latestAnimationPhase = useSystemStore.getState().animationPhase;
    if (latestAnimationPhase === "MODAL_CONTENTS_ENTERING") {
      setAnimationPhase("MODAL_OPEN");
    } else if (latestAnimationPhase === "MODAL_CONTENTS_EXITING") {
      setAnimationPhase("CARD_SCALING_CLOSED");
    }
  };

  return (
    <motion.div
      className={cx(
        "relative overflow-x-hidden overflow-y-scroll rounded bg-night-gradient bg-white text-stars-100 shadow-lg scrollbar-hide",
        className,
      )}
      id="expanded_proj_card"
      layout
      key={`project_expanded_card_${_id}`}
      layoutId={`layout_sibling_card_${_id}`}
      onLayoutAnimationComplete={() => {
        const latestAnimationPhase = useSystemStore.getState().animationPhase;
        if (latestAnimationPhase === "CARD_SCALING_OPEN") {
          setAnimationPhase("MODAL_CONTENTS_ENTERING");
        }
      }}
      transition={{ layout: { duration: 0.7, ease: "easeOut" } }}
      style={{ height: "100vh", width: "100vw", z: 20 }}
      onClick={handleRequestClose}
    >
      {animationPhase === "MODAL_OPEN" && (
        <div
          className="relative flex justify-center pt-10"
          style={{ height: headerHeight }}
        >
          <div className="underline-drawn relative mb-2 flex items-center text-center font-fjalla text-3xl lg:text-5xl">
            <PortableTextRegular content={header} />
          </div>

          {!isPortrait && (
            <div className="relative ml-4 flex flex-col justify-center text-stars-100 hover:scale-150">
              <Icon
                className={cx(
                  "h-6 w-6",
                  animationPhase !== "MODAL_OPEN" && "invisible",
                )}
                icon="back"
                onClick={handleRequestClose}
              />
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {hasVideo &&
          animationPhaseIn(
            ["MODAL_CONTENTS_ENTERING", "MODAL_OPEN"],
            animationPhase,
          ) && (
            <motion.div
              key={`${_id}_modal_hero_video`}
              className="absolute left-0"
              style={{ top: bodyOffset }}
              initial={{ opacity: 0 }}
              animate={videoLoaded ? { opacity: 1 } : { opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              onAnimationComplete={() => {
                handleFinishedCrossfade();
              }}
            >
              {
                <VideoComponent
                  src={video?.asset.url}
                  onLoadedData={() => setVideoLoaded(true)}
                  className={cx(isPortrait && "h-screen object-cover")}
                />
              }
            </motion.div>
          )}
        {hasVideo && animationPhase !== "MODAL_OPEN" && (
          <motion.img
            key={`${_id}_modal_hero_image_with_vid`}
            className={cx(
              "absolute left-0 top-0 h-full h-screen w-full w-screen rounded object-cover",
            )}
            initial={
              animationPhase === "MODAL_CLOSED" ||
              animationPhase === "CARD_SCALING_OPEN"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: bodyOffset }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: bodyOffset }}
            transition={{
              duration: 0.5,
            }}
            src={thumbnail?.asset?.url}
            alt={project.title}
          />
        )}
        {!hasVideo && (
          <motion.img
            key={`${_id}_modal_hero_image_with_vid`}
            className={cx(
              "absolute left-0 top-0 h-full h-screen w-full w-screen rounded object-cover",
            )}
            initial={{ y: 0 }}
            animate={
              animationPhaseIn(
                ["MODAL_CONTENTS_ENTERING", "MODAL_OPEN"],
                animationPhase,
              )
                ? { y: bodyOffset }
                : { y: 0 }
            }
            exit={{ y: 0 }}
            onAnimationComplete={() => {
              console.log("IMAGE CROSS:");
              handleFinishedCrossfade();
            }}
            src={thumbnail?.asset?.url}
            alt={project.title}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
