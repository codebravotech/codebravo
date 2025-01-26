import { ComponentProps, useEffect, useRef } from "react";

export default function VideoComponent({
  muted = true,
  ...props
}: ComponentProps<"video">) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;

    if (!videoEl) return;
    videoEl.muted = muted; // this code
    videoEl.defaultMuted = muted; // this code

    return () => {};
  }, []);

  return <video ref={videoRef} {...props} muted={muted} />;
}
