import cx from "classnames";
import { motion } from "framer-motion";

import { useDisplay } from "../hooks/display";
import { ImageRefResolved, VideoRefResolved } from "../types/components";

export default function VideoBlockFullscreen({
  id,
  video,
  setVideoLoaded,
  className = "",
}: {
  id: string;
  video: VideoRefResolved;
  thumbnail: ImageRefResolved | undefined;
  setVideoLoaded?: (videoLoaded: boolean) => void;
  className?: string;
}) {
  const { isMobile } = useDisplay();
  const {
    playback_speed,
    asset: { url },
  } = video;
  return (
    <motion.video
      id={id}
      className={cx("relative z-20 cursor-pointer object-cover", className)}
      controls={!!isMobile}
      autoPlay
      muted
      loop
      onLoadedData={() => {
        if (setVideoLoaded) {
          setVideoLoaded(true);
        }
        const vidElem = document.getElementById(id) as HTMLVideoElement;
        if (
          vidElem &&
          typeof playback_speed === "number" &&
          0 < playback_speed &&
          playback_speed < 1
        ) {
          vidElem.playbackRate = playback_speed;
        }
      }}
    >
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </motion.video>
  );
}
