import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { useDisplay } from "../hooks/display";
import {
  ProjectObject,
  ResolvedImageRef,
  ResolvedVideoRef,
} from "../types/components";
import Header from "./Header";
import VideoBlockFullscreen from "./VideoBlockFullscreen";

export default function ProjectModalContents({
  project,
  didAnimateOpen,
  handleClose,
  roundingClass,
}: {
  project: ProjectObject;
  didAnimateOpen: boolean;
  handleClose: () => void;
  roundingClass: string;
}) {
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
    <motion.div className="bg-night-gradient absolute bottom-0 left-0 right-0 top-0 overflow-y-scroll overscroll-none text-night-400 scrollbar-hide">
      <Header isHomePage={false} isPortfolio={true} />
      <AnimatePresence>
        {thumbnailUrl && (
          <motion.img
            key={`project_${_id}_modal_img`}
            src={`${thumbnailUrl}?w=${innerWidth}&fit=clip&auto=format`}
            className={cx(
              "absolute bottom-0 left-0 right-0 top-0 h-full w-full",
              !didAnimateOpen && roundingClass,
              !didAnimateOpen || !video || !videoLoaded
                ? "visible"
                : "invisible",
            )}
            alt={alt}
          />
        )}
        <motion.div
          key={`project_${_id}_modal_video`}
          className="flex h-screen w-screen items-center justify-center"
        >
          {video && (
            <VideoBlockFullscreen
              video={video}
              thumbnail={thumbnail}
              setVideoLoaded={setVideoLoaded}
              className={cx(
                didAnimateOpen && videoLoaded ? "visible" : "invisible",
                "w-11/12",
              )}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* {didAnimateOpen && (
        <div>
          <div className="h-32">FILLER</div>
          <div className="h-32">FILLER</div>
          <div className="h-32">FILLER</div>
          <div className="h-32">FILLER</div>
          <div className="h-32">FILLER</div>
          <div className="h-32">FILLER</div>
          <div className="h-32">FILLER</div>
        </div>
      )} */
