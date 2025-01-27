import cx from "classnames";
import { motion } from "framer-motion";

// import { useState } from "react";

import { useDisplay } from "../hooks/display";
// import { useProjectThumbnail, useProjectVideo } from "../hooks/documents";
import { useProjectThumbnail } from "../hooks/documents";
// import { useSystemStore } from "../state/system";
import { ProjectDocument } from "../types/components";

// import Icon from "./Icon";
// import PortableTextRegular from "./PortableTextRegular";
// import VideoComponent from "./VideoComponent";

export default function ProjectCard({
  project,
  className = "",
}: {
  project: ProjectDocument;
  className?: string;
}) {
  const {
    _id,
    //   thumbnail_overlay_color,
    //   private: isPrivate,
    //   client_logo,
    //   description,
  } = project;
  const { isPortrait } = useDisplay();
  // const { token } = useSystemStore();
  // const [videoLoaded, setVideoLoaded] = useState(false);
  const thumbnail = useProjectThumbnail(project);
  // const video = useProjectVideo(project);

  // const overlayClasses =
  //   // "absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center rounded-2xl group-hover:scale-105 group-hover:!opacity-100";
  //   "absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center rounded-2xl lg:group-hover:!opacity-100";
  if (!_id) {
    return null;
  }

  return (
    <motion.div
      id="project_card"
      layout
      key={`project_expanded_card_${_id}`}
      layoutId={`layout_sibling_card_${_id}`}
      className={cx(
        "group relative basis-1/2 rounded-2xl shadow-2xl",
        className,
      )}
      style={
        isPortrait
          ? {
              height: "100vh",
              width: "100vw",
            }
          : {
              height: "43vh",
              width: "auto",
            }
      }
    >
      {/* Main bg image */}
      <img
        src={thumbnail?.asset?.url}
        alt={thumbnail?.alt}
        className={cx(
          // "h-full w-full rounded-2xl object-fill group-hover:scale-105",
          "h-full w-full rounded-2xl object-fill",
          // sharedClasses,
        )}
      />
    </motion.div>
  );
}

// {/* Hidden video in the BG to preload */}
// {video?.asset?.url && !videoLoaded && (
//   <VideoComponent
//     className="absolute left-0 top-0 -z-10 h-10 w-10"
//     src={video.asset.url}
//     onLoadedData={() => setVideoLoaded(true)}
//   />
// )}

// {/* Color overlay */}
// <div
//   className={cx(overlayClasses)}
//   style={{
//     backgroundColor: thumbnail_overlay_color?.trim(),
//     opacity: 0,
//     mixBlendMode: "multiply",
//   }}
// />
// {/* Logo/text overlay */}
// {/* <div className="invisible absolute inset-0 flex h-full w-full flex-col items-center justify-center bg-night-400/50 px-6 text-center text-2xl text-stars-100 group-hover:visible"> */}
// <div
//   className={cx(
//     overlayClasses,
//     "gap-4 bg-night-400/50 text-center text-stars-100 opacity-0 group-hover:visible",
//   )}
// >
//   {client_logo && (
//     <img
//       src={client_logo.asset?.url}
//       alt={client_logo.alt}
//       className="max-h-[40%] max-w-[60%] object-contain"
//     />
//   )}
//   <div className="h6 max-w-[70%] font-raleway font-bold">
//     <PortableTextRegular content={description} />
//   </div>
// </div>
// {isPrivate && !token && (
//   <div className={cx(overlayClasses)}>
//     <Icon
//       icon="lock"
//       className="font-night-100 z-40 max-h-[40%] max-w-[60%] object-contain text-night-100 group-hover:text-stars-100"
//     />
//   </div>
// )}
