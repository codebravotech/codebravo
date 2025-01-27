import { useEffect, useRef } from "react";

export default function VideoComponent({
  src,
  playback_speed,
  id,
  className,
  onLoadedData = () => {},
}: {
  src: string | undefined;
  playback_speed?: number;
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

  useEffect(() => {
    const videoEl = videoRef.current;

    if (!videoEl) return;
    if (
      videoEl &&
      typeof playback_speed === "number" &&
      0 < playback_speed &&
      playback_speed < 1
    ) {
      videoEl.playbackRate = playback_speed;
    }

    return () => {};
  }, [playback_speed]);

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
