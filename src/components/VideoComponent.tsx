import { useEffect, useRef } from "react";

export default function VideoComponent({
  src,
  id,
  className,
  onLoadedData = () => {},
}: {
  src: string | undefined;
  id?: string;
  className?: string;
  onLoadedData: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;

    if (!videoEl) return;
    videoEl.muted = true;
    videoEl.defaultMuted = true;

    return () => {};
  }, []);

  if (!src) {
    return;
  }

  return (
    <video
      ref={videoRef}
      id={id}
      className={className}
      src={src}
      muted
      autoPlay
      loop
      playsInline
      webkit-playsinline={"true"}
      onContextMenu={() => false}
      onLoadedData={onLoadedData}
    />
  );
}

// onLoadedData={() => {
//   if (setVideoLoaded) {
//     setVideoLoaded(true);
//   }
//   const vidElem = document.getElementById(id) as HTMLVideoElement;
//   if (
//     vidElem &&
//     typeof playback_speed === "number" &&
//     0 < playback_speed &&
//     playback_speed < 1
//   ) {
//     vidElem.playbackRate = playback_speed;
//   }
// }}
