import cx from "classnames";
import {
  easeOut,
  motion,
  // useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { CSSProperties, useRef } from "react";

import { IMAGE_SCALE_FACTOR } from "../config";

export default function ParallaxImage({
  src,
  alt,
  className = "",
  style = {},
  updatePosition = (ref) => {
    console.log(ref);
  },
}: {
  src: string;
  alt: string;
  style?: CSSProperties;
  className?: string;
  updatePosition: (ref) => void;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  // updatePosition(ref);
  // });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.8],
    [IMAGE_SCALE_FACTOR, 1],
    {
      ease: easeOut,
    },
  );
  return (
    <motion.img
      key={`image_${src}`}
      ref={ref}
      // className={cx("h-[100%] w-[100%] object-contain", className)}
      className={cx("img_scalable my-5 lg:mb-0", className)}
      src={src}
      alt={alt}
      style={{
        ...style,
        scale,
      }}
      onLoad={() => updatePosition(ref)}
    />
  );
}
