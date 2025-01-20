import cx from "classnames";
import { useState } from "react";

import { ResolvedImageRef, ResolvedVideoRef } from "../types/components";

export default function VideoBlockFullscreen({
  video,
  thumbnail,
  videoLoaded,
  setVideoLoaded,
  className = "",
}: {
  video: ResolvedVideoRef;
  thumbnail: ResolvedImageRef | undefined;
  videoLoaded: boolean;
  setVideoLoaded: (videoLoaded: boolean) => void;
  className?: string;
}) {
  const {
    asset: { url },
  } = video;
  // const [imageAnimationComplete, setImageAnimationComplete] = useState(false);

  return (
    <div className={cx("relative w-screen overflow-hidden")}>
      <div className={cx(className, "z-20")}>
        <video
          className="object-scale-down"
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
        </video>
      </div>
    </div>
  );
}
