import cx from "classnames";
import { motion } from "framer-motion";

import ArriveDirectionally from "../../animations/ArriveDirectionally";
import { useDisplay } from "../../hooks/display";
import { ContentObject } from "../../types/components";
import PortableTextRegular from "../PortableTextRegular";

export default function CopyContentBlock({
  content_block,
}: {
  content_block: ContentObject;
}) {
  const { _key, copy = [], block_axis, text_align } = content_block;
  const { isPortrait } = useDisplay();
  const axis = isPortrait ? "vertical" : block_axis;
  let textClasses = "items-center text-center";

  if (axis === "horizontal") {
    if (text_align === "left") {
      textClasses = "items-start";
    } else if (text_align === "right") {
      textClasses = "items-end";
    }
  }

  return (
    <motion.div
      key={_key}
      className={cx(
        "relative flex w-5/6 flex-col justify-center text-center",
        textClasses,
      )}
    >
      <ArriveDirectionally keyBy={`${content_block?._key}_copy`} direction="up">
        <PortableTextRegular link_color="stars-100" content={copy} />
      </ArriveDirectionally>
    </motion.div>
  );
}
