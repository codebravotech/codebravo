import cx from "classnames";
import { motion } from "framer-motion";
import { useRef } from "react";

import ArriveDirectionally from "../../animations/ArriveDirectionally";
import { useAssetOrientation, useDisplay } from "../../hooks/display";
import { ContentObject } from "../../types/components";
import PortableTextRegular from "../PortableTextRegular";

export default function AssetAndCopyContentBlock({
  content_block,
  assetOnly = false,
}: {
  content_block: ContentObject;
  assetOnly: boolean;
}) {
  const {
    _key,
    copy = [],
    image,
    video,
    block_axis,
    block_ordering,
    text_align,
  } = content_block;
  const { isPortrait, isMobile } = useDisplay();
  const axis = isPortrait ? "vertical" : block_axis;
  let axisClasses = "flex-col";
  let assetContainerClasses = "";
  let assetClasses = "";
  let textClasses = "";
  let assetArrivalDirection: "up" | "left" | "right" = "up";
  let textArrivalDirection: "up" | "left" | "right" = "up";

  const orientation = image?.orientation || video?.orientation;
  const assetIsPortrait = orientation === "portrait";

  if (axis === "vertical") {
    if (block_ordering === "asset_copy") {
      axisClasses = "flex-col items-center justify-center";
    } else {
      axisClasses = "flex-col-reverse items-center justify-center";
    }

    if (text_align === "left") {
      textClasses = "text-left self-start ml-8 w-1/2";
    } else if (text_align === "right") {
      textClasses = "text-right self-end mr-8 w-1/2";
    }
  } else if (axis === "horizontal") {
    assetClasses = "rounded-2xl";
    assetContainerClasses = `${assetIsPortrait ? "basis-1/3 grow-0" : "basis-2/3"} mx-6`;
    if (block_ordering === "asset_copy") {
      assetArrivalDirection = "right";
      textArrivalDirection = "left";

      axisClasses = "flex-row items-center";
    } else {
      assetArrivalDirection = "left";
      textArrivalDirection = "right";
      axisClasses = "flex-row-reverse items-center";
    }

    textClasses = `text-left mx-8 basis-1/3 ${assetIsPortrait ? "grow" : "grow-0"}`;
  }

  return (
    <motion.div key={_key} className={cx("relative flex", axisClasses)}>
      {image?.asset?.url && (
        <ArriveDirectionally
          keyBy={`content_block_${_key}_asset_img`}
          direction={assetArrivalDirection}
          className={assetContainerClasses}
        >
          <img
            className={assetClasses}
            src={image?.asset?.url}
            alt={image?.alt}
          />
        </ArriveDirectionally>
      )}
      {video && video?.asset?.url && (
        <ArriveDirectionally
          keyBy={`content_block_${_key}_asset_video`}
          direction={assetArrivalDirection}
          className={assetContainerClasses}
        >
          <motion.video
            className={cx(
              assetClasses,
              assetIsPortrait ? "max-h-[95vh]" : "max-h-[100vh]",
              "relative cursor-pointer object-scale-down",
            )}
            controls={!!isMobile}
            autoPlay
            muted
            loop
          >
            <source src={video?.asset?.url} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        </ArriveDirectionally>
      )}
      {!assetOnly && (
        <ArriveDirectionally
          keyBy={`content_block_${_key}_copy`}
          direction={textArrivalDirection}
          className={cx("relative my-8 flex flex-col", textClasses)}
        >
          <PortableTextRegular link_color="stars-100" content={copy} />
        </ArriveDirectionally>
      )}
    </motion.div>
  );
}
