import { motion } from "framer-motion";
import { get } from "lodash";

import OverlappingContentBlock from "../components/ContentBlocks/OverlappingContentBlock";
import { usePublicQuery } from "../hooks/api";
import { ContentObject, ExpertisePageDocument } from "../types/components";

export default function Expertise() {
  const { documents = [] } = usePublicQuery<ExpertisePageDocument>("expertise");
  const page = get(documents, "[0]");
  const content_blocks = page?.content_blocks;
  if (!(content_blocks && content_blocks?.length)) {
    return null;
  }

  return (
    <motion.div className="flex w-screen flex-col gap-10 overflow-hidden px-4 font-raleway scrollbar-hide lg:px-0">
      {content_blocks.map((content_block: ContentObject, index: number) => (
        <OverlappingContentBlock
          key={`content_block_${index}`}
          content_block={content_block}
          // justified={index % 2 === 0 ? "right" : "left"}
          justified={index % 2 === 0 ? "left" : "right"}
        />
      ))}
    </motion.div>
  );
}
