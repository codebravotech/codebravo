import cx from "classnames";
import { motion } from "framer-motion";
import { get } from "lodash";
import { useEffect, useRef, useState } from "react";
import CtaButton from "./CtaButton";
import { Content_block } from "../types/sanity.types";
import PortableTextRegular from "./PortableTextRegular";
import { PortableTextBlock } from "@portabletext/types";
import ArriveUpwards from "../animations/ArriveUpwards";

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
  const [imgWidth, setImgWidth] = useState(0);
  const _key = get(content_block, "_key", {});
  const cta_link = get(content_block, "cta_link", {});
  const file_link = get(content_block, "file_link", {});
  const buttonText = get(cta_link, "label", "") || get(file_link, "label", "");
  const fileAsset = get(content_block, "fileAsset");
  const buttonUrl = fileAsset
    ? get(fileAsset, "url", "")
    : get(cta_link, "url", "");

  const image = get(content_block, "imageAsset", "");
  const src = get(image, "url", "");
  const dimensions = get(image, "metadata.dimensions", {});
  const height = get(dimensions, "height", 0);
  const width = get(dimensions, "width", 0);
  const orientation = height > width ? "portrait" : "landscape";
  const alt = get(content_block, "imageAlt", "");
  const copy = get(content_block, "copy", []);
  const paddingX = 25;
  const justifiedLeft = justified === "left";
  const justifiedRight = justified === "right";
  const isWideImage = imgWidth >= innerWidth / 2;

  let copyStyle = {};
  let imageStyle = {};
  if (justifiedLeft) {
    if (isWideImage) {
      imageStyle = {
        left: paddingX,
      };
      copyStyle = { width: imgWidth * 0.8 };
    } else {
      copyStyle = {
        left: paddingX * 2,
        width: imgWidth * 1.5,
      };
    }
  } else if (justifiedRight) {
    if (isWideImage) {
      imageStyle = {
        right: paddingX,
      };
      copyStyle = {
        width: imgWidth * 0.8,
      };
    } else {
      copyStyle = {
        right: paddingX * 2,
        width: imgWidth * 1.5,
      };
    }
  }

  const updatePosition = () => {
    if (imgRef.current) {
      const { left, right } = imgRef.current.getBoundingClientRect();
      const width = Math.round(right - left);
      setImgPosition({ left, right });
      setImgWidth(width);
    }
  };

  useEffect(() => {
    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("load", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("load", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  console.log(JSON.stringify({ content_block }));

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
            "relative rounded-2xl object-scale-down shadow-lg",
            orientation === "portrait" && "max-h-[75vh] max-w-[50vw]",
            orientation === "landscape" && "max-w-[70vw]",
          )}
          src={src}
          alt={alt}
          style={imageStyle}
        />
      </motion.div>
      {/* 
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
      </div> */}

      <div
        className={cx("absolute -bottom-16 text-xl")}
        ref={copyRef}
        style={copyStyle}
      >
        <ArriveUpwards key={`content_block_copy_${_key}`} delay={1}>
          {copy?.length > 0 && (
            <div className="text-stars-300 bg-expanse-100 z-10 flex flex-col rounded-xl bg-opacity-[97%] px-8 py-5 shadow-lg">
              <PortableTextRegular content={copy as PortableTextBlock[]} />
              <CtaButton url={buttonUrl} variant="white_blue">
                {buttonText}
              </CtaButton>
            </div>
          )}
        </ArriveUpwards>
      </div>
    </motion.div>
  );
}
