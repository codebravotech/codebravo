import cx from "classnames";
import { motion } from "framer-motion";

import { useDisplay } from "../hooks/display";
import { ImageRefResolved, VideoRefResolved } from "../types/components";

export default function VideoBlockFullscreen({
  video,
  setVideoLoaded,
  className = "",
}: {
  video: VideoRefResolved;
  thumbnail: ImageRefResolved | undefined;
  setVideoLoaded?: (videoLoaded: boolean) => void;
  className?: string;
}) {
  const { isMobile } = useDisplay();
  const {
    asset: { url },
  } = video;

  return (
    <motion.video
      className={cx("relative cursor-pointer object-scale-down", className)}
      controls={!!isMobile}
      autoPlay
      muted
      loop
      onLoadedData={() => {
        if (setVideoLoaded) {
          setVideoLoaded(true);
        }
      }}
    >
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </motion.video>
  );
}
