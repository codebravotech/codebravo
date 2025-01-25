import cx from "classnames";
import { motion } from "framer-motion";
import { useRef } from "react";

import ArriveDirectionally from "../../animations/ArriveDirectionally";
import { useDisplay } from "../../hooks/display";
import {
  useContentBlockImage,
  useContentBlockVideo,
} from "../../hooks/documents";
import {
  ContentObject,
  ImageRefResolved,
  VideoRefResolved,
} from "../../types/components";
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
  let assetType: "video" | "image" | "" = "";
  let orientation = "landscape";
  let playback_speed = 1;

  const image: ImageRefResolved | undefined =
    useContentBlockImage(content_block);
  const video: VideoRefResolved | undefined =
    useContentBlockVideo(content_block);

  if (video) {
    orientation = video?.orientation || "landscape";
    playback_speed = video?.playback_speed || 1;
    assetType = "video";
  } else if (image) {
    orientation = image?.orientation || "landscape";
    assetType = "image";
  }

  const assetIsPortrait = orientation === "portrait";

  if (axis === "vertical") {
    if (block_ordering === "asset_copy") {
      axisClasses = "flex-col items-center justify-center";
    } else {
      axisClasses = "flex-col-reverse items-center justify-center";
    }

    if (isPortrait) {
      textClasses = "w-screen px-5 text-center";
    } else if (text_align === "left" && !isPortrait) {
      textClasses = "text-left self-start ml-8 w-1/2";
    } else if (text_align === "right" && !isPortrait) {
      textClasses = "text-right self-end mr-8 w-1/2";
    } else if (text_align === "center") {
      textClasses = "w-2/3 text-center";
    }
  } else if (axis === "horizontal") {
    assetClasses = "rounded-2xl";
    assetContainerClasses = assetIsPortrait
      ? "basis-1/2 flex flex justify-center"
      : "basis-2/3 mx-6";

    if (block_ordering === "asset_copy") {
      assetArrivalDirection = "right";
      textArrivalDirection = "left";

      axisClasses = "flex-row items-center";
    } else {
      assetArrivalDirection = "left";
      textArrivalDirection = "right";
      axisClasses = "flex-row-reverse items-center ";
    }

    if (isPortrait) {
      textClasses = "w-screen px-6 text-center grow-0";
    } else {
      if (assetIsPortrait) {
        axisClasses = `flex-row-reverse`;
        textClasses = `basis-3/4 flex text-center mx-8 justify-center`;
      } else {
        textClasses = "basis-1/2 mx-8 grow-0";
      }
    }
  }

  const videoId = `content_block_${_key}_video_${orientation}`;

  return (
    <motion.div key={_key} className={cx("relative flex", axisClasses)}>
      {assetType === "video" && (
        <ArriveDirectionally
          keyBy={`content_block_${_key}_asset_video`}
          direction={assetArrivalDirection}
          className={cx(assetContainerClasses, "grow-0")}
        >
          <motion.video
            id={videoId}
            className={cx(
              assetClasses,
              assetIsPortrait ? "max-h-[95vh]" : "max-h-[100vh]",
              "relative cursor-pointer object-scale-down",
            )}
            controls={!!isMobile}
            autoPlay
            muted
            loop
            onLoadedData={() => {
              const vidElem = document.getElementById(
                videoId,
              ) as HTMLVideoElement;
              if (
                vidElem &&
                typeof playback_speed === "number" &&
                0 < playback_speed &&
                playback_speed < 1
              ) {
                vidElem.playbackRate = playback_speed;
              }
            }}
          >
            <source src={video?.asset?.url} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        </ArriveDirectionally>
      )}
      {assetType === "image" && (
        <ArriveDirectionally
          keyBy={`content_block_${_key}_asset_img`}
          direction={assetArrivalDirection}
          className={assetContainerClasses}
        >
          <img
            className={assetClasses}
            src={`${image?.asset?.url}?w=${innerWidth * 2}&fit=clip&auto=format`}
            alt={image?.alt}
          />
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
