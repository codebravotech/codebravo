import cx from "classnames";
import { motion } from "framer-motion";

import { ContentObject } from "../../types/components";
import PortableTextRegular from "../PortableTextRegular";

export default function CopyContentBlock({
  content_block,
}: {
  content_block: ContentObject;
}) {
  const { _key, copy = [] } = content_block;

  return (
    <motion.div
      key={_key}
      className={cx(
        "relative flex w-3/4 flex-col items-center justify-center text-center",
      )}
    >
      <PortableTextRegular link_color="stars-100" content={copy} />
    </motion.div>
  );
}
