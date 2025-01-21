import cx from "classnames";
import { motion } from "framer-motion";

import { ImageRefResolved, VideoRefResolved } from "../types/components";

export default function VideoBlockFullscreen({
  video,
  // setVideoLoaded,
  className = "",
}: {
  video: VideoRefResolved;
  thumbnail: ImageRefResolved | undefined;
  // setVideoLoaded: (videoLoaded: boolean) => void;
  className?: string;
}) {
  const {
    asset: { url },
  } = video;

  return (
    <motion.video
      className={cx("relative cursor-pointer object-scale-down", className)}
      controls={true}
      autoPlay
      muted
      loop
      // onLoadedData={() => {
      //   setVideoLoaded(true);
      // }}
    >
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </motion.video>
  );
}
