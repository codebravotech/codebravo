import cx from "classnames";
import { motion } from "framer-motion";
import { useState } from "react";

import { useDisplay } from "../hooks/display";
import { useProjectThumbnail, useProjectVideo } from "../hooks/documents";
import { useSystemStore } from "../state/system";
import { ProjectDocument } from "../types/components";
import Icon from "./Icon";
import PortableTextRegular from "./PortableTextRegular";
import VideoComponent from "./VideoComponent";

export default function ProjectCard({
  project,
  className = "",
}: {
  project: ProjectDocument;
  className?: string;
}) {
  const {
    _id,
    thumbnail_overlay_color,
    private: isPrivate,
    client_logo,
    description,
  } = project;
  const { isTabletOrMobile } = useDisplay();
  const { token, animationPhase } = useSystemStore();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const thumbnail = useProjectThumbnail(project);
  const video = useProjectVideo(project);

  const overlayClasses =
    "absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center rounded-2xl";
  const visibilityClasses =
    !isTabletOrMobile && animationPhase !== "MODAL_CLOSED"
      ? ""
      : "group-hover:scale-105 group-hover:!opacity-100 group-hover:!visible";

  if (!_id) {
    return null;
  }

  return (
    <motion.div
      id="project_card"
      key={`project_expanded_card_${_id}`}
      className={cx(
        "group relative rounded-2xl shadow-2xl",
        className,
        isTabletOrMobile ? "h-[100vh] w-[97vw]" : "h-[42.5vh] w-[45vw]",
      )}
    >
      {/* Main body of card is image */}
      <img
        src={`${thumbnail?.asset?.url}?w=800&fit=clip&auto=format`}
        alt={thumbnail?.alt}
        className={cx(
          "h-full w-full rounded-2xl object-fill",
          visibilityClasses,
        )}
      />
      {animationPhase === "MODAL_CLOSED" && !isTabletOrMobile && (
        <>
          {/* Hidden video in the BG to preload */}
          {video?.asset?.url && !videoLoaded && (
            <VideoComponent
              className="absolute left-0 top-0 -z-10 h-10 w-10"
              src={video.asset.url}
              onLoadedData={() => setVideoLoaded(true)}
            />
          )}

          {/* Color overlay */}
          <div
            className={cx(overlayClasses, visibilityClasses)}
            style={{
              backgroundColor: thumbnail_overlay_color?.trim(),
              opacity: 0,
              mixBlendMode: "multiply",
            }}
          />
          {/* Logo/text overlay */}
          <div
            className={cx(
              overlayClasses,
              visibilityClasses,
              "gap-4 bg-night-400/50 text-center text-stars-100 opacity-0",
            )}
          >
            {client_logo && (
              <img
                src={client_logo.asset?.url}
                alt={client_logo.alt}
                className="max-h-[40%] max-w-[60%] object-contain"
              />
            )}
            <div className="h6 max-w-[70%] font-raleway font-bold">
              <PortableTextRegular content={description} />
            </div>
          </div>
          {isPrivate && !token && (
            <div className={cx(overlayClasses)}>
              <Icon
                icon="lock"
                className="font-night-100 z-20 max-h-[40%] max-w-[60%] object-contain text-night-100 group-hover:text-stars-100"
              />
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
