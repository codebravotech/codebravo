import cx from "classnames";
import { motion } from "framer-motion";

import { ResolvedImageRef, ResolvedVideoRef } from "../types/components";

export default function VideoBlockFullscreen({
  video,
  setVideoLoaded,
  className = "",
}: {
  video: ResolvedVideoRef;
  thumbnail: ResolvedImageRef | undefined;
  setVideoLoaded: (videoLoaded: boolean) => void;
  className?: string;
}) {
  const {
    asset: { url },
  } = video;

  return (
    <motion.video
      className={cx("relative object-scale-down", className)}
      controls={false}
      autoPlay
      muted
      loop
      onLoadedData={() => {
        setVideoLoaded(true);
      }}
    >
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </motion.video>
  );
}
