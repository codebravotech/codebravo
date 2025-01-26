import cx from "classnames";

import { ImageRefResolved, VideoRefResolved } from "../types/components";
import VideoComponent from "./VideoComponent";

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
  const {
    playback_speed,
    asset: { url },
  } = video;

  return (
    <VideoComponent
      id={id}
      className={cx("relative z-20 object-cover", className)}
      src={url}
      controls={false}
      autoPlay
      muted
      onContextMenu={() => false}
      loop
      playsInline
      webkit-playsinline={"true"}
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
    />
  );
}
