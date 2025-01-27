import cx from "classnames";

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
  // const {
  //   thumbnail_overlay_color,
  //   private: isPrivate,
  //   client_logo,
  //   description,
  // } = project;
  // const { token } = useSystemStore();
  // const [videoLoaded, setVideoLoaded] = useState(false);
  const thumbnail = useProjectThumbnail(project);
  // const video = useProjectVideo(project);
  const { isPortrait } = useDisplay();

  // const overlayClasses =
  //   // "absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center rounded-2xl group-hover:scale-105 group-hover:!opacity-100";
  //   "absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center rounded-2xl lg:group-hover:!opacity-100";

  return (
    <div
      className={cx(
        "group relative basis-1/2 rounded-2xl shadow-2xl",
        isPortrait ? "max-w-[97%] basis-full" : "h-[43vh]",
        className,
      )}
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
    </div>
  );
}
