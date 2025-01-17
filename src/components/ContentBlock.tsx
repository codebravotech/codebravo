import { PortableTextBlock } from "@portabletext/types";
import cx from "classnames";
import { motion } from "framer-motion";
import { get, update } from "lodash";
import { useEffect, useRef, useState } from "react";

import ArriveDirectionally from "../animations/ArriveDirectionally";
import ParallaxImage from "../animations/ParallaxImage";
import { IMAGE_SCALE_FACTOR } from "../config";
import { useDisplay } from "../hooks/display";
import { Content_block } from "../types/sanity.types";
import CtaButton from "./CtaButton";
import PortableTextRegular from "./PortableTextRegular";

export default function ContentBlock({
  content_block,
  justified,
}: {
  content_block: Content_block;
  justified: "left" | "right";
}) {
  const { isMobile } = useDisplay();
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
  const paddingX = !isMobile ? 35 : 0;
  const justifiedLeft = justified === "left";
  const justifiedRight = justified === "right";
  const isWideImage = imgWidth >= innerWidth / 2;

  let copyStyle: React.CSSProperties = { width: "50vw", height: "30vh" };
  let imgContainerStyle = {};
  if (justifiedLeft) {
    if (isWideImage) {
      imgContainerStyle = {
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
      imgContainerStyle = {
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

  const updatePosition = (ref: any) => {
    if (ref.current) {
      const { left, right } = ref.current.getBoundingClientRect();
      const width = (Math.round(right - left) * 1) / IMAGE_SCALE_FACTOR;
      setImgWidth(width);
    }
  };

  return (
    <motion.div
      className={cx(
        "relative flex flex-col items-center lg:h-screen lg:flex-row lg:items-start",
        justifiedRight && "lg:flex-row-reverse",
      )}
      style={{ paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}
    >
      <motion.div
        key={`container_${src}`}
        initial={{
          x: isMobile ? 0 : 100 * (justifiedLeft ? -1 : 1),
          opacity: 0,
          filter: "blur(44px)",
        }}
        whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0 }}
        viewport={{ once: true }}
        className={cx(
          "relative overflow-hidden bg-transparent lg:rounded-2xl",
          !isMobile && orientation === "portrait" && "h-[75vh] max-w-[50vw]",
          !isMobile && orientation === "landscape" && "max-w-[70vw]",
          isMobile && "w-screen",
        )}
        style={isMobile ? {} : imgContainerStyle}
      >
        <ParallaxImage
          src={src}
          alt={alt}
          updatePosition={updatePosition}
          className="shadow-xl lg:rounded-2xl"
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

      {_key && (
        <div
          className={cx(
            !(imgWidth > 0) && "invisible",
            !isMobile && "max-h-[40vh] text-xl lg:absolute lg:bottom-32",
            isMobile && "relative mt-2 w-full",
          )}
          style={isMobile ? {} : copyStyle}
        >
          <ArriveDirectionally
            keyBy={`content_block_copy_${_key}`}
            delay={0}
            direction={"right"}
          >
            <div className="bg-expanse-gradient z-10 flex flex-col items-stretch rounded-2xl bg-opacity-[97%] px-4 py-5 text-stars-300 shadow-lg lg:items-start lg:px-8">
              <PortableTextRegular content={copy as PortableTextBlock[]} />
              <CtaButton url={buttonUrl} variant="white_blue">
                {buttonText}
              </CtaButton>
            </div>
          </ArriveDirectionally>
        </div>
      )}
    </motion.div>
  );
}
