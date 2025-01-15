import cx from "classnames";
import { motion } from "framer-motion";
import { get } from "lodash";
import { useEffect, useRef, useState } from "react";
import CtaButton from "./CtaButton";
import { Content_block } from "../types/sanity.types";
import PortableTextRegular from "./PortableTextRegular";
import { PortableTextBlock } from "@portabletext/types";
import ArriveUpwards from "../animations/ArriveUpwards";
import { useDisplay } from "../hooks/display";

export default function ContentBlock({
  content_block,
  justified,
}: {
  content_block: Content_block;
  justified: "left" | "right";
}) {
  const { isMobile } = useDisplay();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  // const [imgPosition, setImgPosition] = useState({ left: 0, right: 0 });
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

  let copyStyle: React.CSSProperties = { width: "50vw" };
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
      // setImgPosition({ left, right });
      setImgWidth(width);
    }
  };

  useEffect(() => {
    updatePosition();

    window.addEventListener("resize", updatePosition);
    // window.addEventListener("load", updatePosition);
    // window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      // window.removeEventListener("load", updatePosition);
      // window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  return (
    <motion.div
      className={cx(
        "relative mb-10 flex h-screen flex-col items-center lg:mb-44 lg:flex-row",
        justifiedRight && "lg:flex-row-reverse",
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
            "rounded-2xl object-scale-down shadow-lg",
            !isMobile && "relative",
            !isMobile &&
              orientation === "portrait" &&
              "max-h-[75vh] max-w-[50vw]",
            !isMobile && orientation === "landscape" && "max-w-[70vw]",
            isMobile && "w-full",
          )}
          src={src}
          alt={alt}
          style={imageStyle}
          onLoad={updatePosition}
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

      {_key && imgWidth && (
        <div
          className={cx(
            !isMobile && "max-h-[40vh] text-xl lg:absolute lg:-bottom-16",
            isMobile && "relative mt-2 w-full bg-red-200",
          )}
          ref={copyRef}
          style={isMobile ? {} : copyStyle}
        >
          <ArriveUpwards keyBy={`content_block_copy_${_key}`} delay={0.5}>
            <div className="text-stars-300 bg-expanse-100 z-10 flex flex-col items-stretch rounded-2xl bg-opacity-[97%] px-4 py-5 shadow-lg lg:items-start lg:px-8">
              <PortableTextRegular content={copy as PortableTextBlock[]} />
              <CtaButton url={buttonUrl} variant="white_blue">
                {buttonText}
              </CtaButton>
            </div>
          </ArriveUpwards>
        </div>
      )}
    </motion.div>
  );
}
