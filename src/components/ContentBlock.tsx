import { PortableText } from "@portabletext/react";
import cx from "classnames";
import { motion } from "framer-motion";
import { get } from "lodash";
import { useEffect, useRef, useState } from "react";
import CtaButton from "./CtaButton";
import { Content_block } from "../types/sanity.types";

export default function ContentBlock({
  content_block,
  justified,
}: {
  content_block: Content_block;
  justified: "left" | "right";
}) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const [imgPosition, setImgPosition] = useState({ left: 0, right: 0 });
  // const [copyDimensions, setCopyDimensions] = useState({ width: 0, height: 0 });
  const cta_link = get(content_block, "cta_link", {});
  const file_link = get(content_block, "file_link", {});
  const buttonText = get(cta_link, "label", "") || get(file_link, "label", "");
  const fileAsset = get(content_block, "fileAsset");
  const buttonUrl = fileAsset
    ? get(fileAsset, "url", "")
    : get(cta_link, "link_path", "");

  const image = get(content_block, "imageAsset", "");
  const src = get(image, "url", "");
  const dimensions = get(image, "metadata.dimensions", {});
  const height = get(dimensions, "height", 0);
  const width = get(dimensions, "width", 0);
  const orientation = height > width ? "portrait" : "landscape";
  const alt = get(content_block, "imageAlt", "");
  const copy = get(content_block, "copy", []);
  const paddingX = 25;
  const imageWidth = Math.round(imgPosition.right - imgPosition.left);
  const justifiedLeft = justified === "left";
  const justifiedRight = justified === "right";

  let copyStyle = {};
  let imageStyle = {};
  if (justifiedLeft) {
    if (imageWidth >= innerWidth / 2) {
      imageStyle = {
        left: paddingX,
      };
      copyStyle = { width: imageWidth * 0.8 };
    } else {
      copyStyle = {
        left: paddingX * 2,
        width: imageWidth * 1.5,
      };
    }
  } else if (justifiedRight) {
    if (imageWidth >= innerWidth / 2) {
      imageStyle = {
        right: paddingX,
      };
      copyStyle = {
        width: imageWidth * 0.8,
      };
    } else {
      copyStyle = {
        right: paddingX * 2,
        width: imageWidth * 1.5,
      };
    }
  }

  const updatePosition = () => {
    if (imgRef.current) {
      const { left, right } = imgRef.current.getBoundingClientRect();
      setImgPosition({ left, right });
    }

    if (copyRef.current) {
      const { offsetWidth: width, offsetHeight: height } = copyRef.current;
      console.log("width", { width, height });
      // setCopyDimensions({ width, height });
    }
  };

  useEffect(() => {
    // Update size on initial render
    updatePosition();

    // Update size on window resize
    window.addEventListener("resize", updatePosition);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <motion.div
      className={cx(
        "relative mb-44 flex h-screen flex-row items-center",
        justifiedRight && "flex-row-reverse",
      )}
      style={{ paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}
    >
      <motion.div
        initial={{
          x: 100 * (justifiedLeft ? -1 : 1),
          opacity: 0,
          filter: "blur(44px)",
        }}
        whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <img
          ref={imgRef}
          className={cx(
            "relative rounded-2xl object-scale-down",
            orientation === "portrait" && "max-h-[80vh] max-w-[50vw]",
            orientation === "landscape" && "max-w-[70vw]",
          )}
          src={src}
          alt={alt}
          style={imageStyle}
        />
      </motion.div>

      <div className="flex w-full justify-center">
        <CtaButton
          url={buttonUrl}
          label={buttonText}
          style={
            justifiedLeft
              ? { marginLeft: paddingX * 2 }
              : { marginRight: paddingX * 2 }
          }
        />
      </div>

      {imageWidth > 0 && (
        <div
          ref={copyRef}
          className={cx("absolute bottom-2 text-xl")}
          style={copyStyle}
        >
          <div className="text-stars-300 bg-expanse-300 z-10 rounded-xl bg-opacity-80 p-6">
            <PortableText value={copy} />
          </div>
        </div>
      )}
    </motion.div>
  );
}
