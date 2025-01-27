import cx from "classnames";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

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
  const { token, animationPhase, setAnimationPhase, setOpenProjectId } =
    useSystemStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const thumbnail = useProjectThumbnail(project);
  const video = useProjectVideo(project);

  const finalizeClose = () => {
    setAnimationPhase("MODAL_CLOSED");
    setOpenProjectId(null);
    searchParams.delete("p");
    setSearchParams(searchParams);
  };

  const overlayClasses =
    "absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center rounded-2xl";
  const visibilityClasses =
    animationPhase !== "MODAL_CLOSED"
      ? ""
      : "group-hover:scale-105 group-hover:!opacity-100 group-hover:!visible";

  if (!_id) {
    return null;
  }

  return (
    <motion.div
      id="project_card"
      layout
      key={`project_expanded_card_${_id}`}
      layoutId={`layout_sibling_card_${_id}`}
      className={cx("group rounded-2xl shadow-2xl", className)}
      transition={
        animationPhase === "MODAL_CLOSED"
          ? { duration: 0 }
          : { layout: { duration: 0.5, ease: "easeOut", delay: 0.3 } }
      }
      onLayoutAnimationComplete={() => {
        const latestAnimationPhase = useSystemStore.getState().animationPhase;
        if (latestAnimationPhase === "CARD_SCALING_CLOSED") {
          finalizeClose();
        }
      }}
      style={{
        position: "relative",
        ...(isTabletOrMobile
          ? {
              height: "100vh",
              width: "97vw",
            }
          : {
              height: "42.5vh",
              width: "45vw",
            }),
      }}
    >
      {/* Main body of card is image */}
      <img
        src={thumbnail?.asset?.url}
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
