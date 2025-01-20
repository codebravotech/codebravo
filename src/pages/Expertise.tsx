import { SanityDocument } from "@sanity/client";
import { motion } from "framer-motion";
import groq from "groq";
import { get } from "lodash";

import ContentBlock from "../components/ContentBlock";
import { useQuery } from "../hooks/sanity";
import { Content_block } from "../types/sanity.types";

export default function Expertise() {
  const query = groq`
    *[_id == $page_id]{ ..., content_blocks[]{ ..., image { ..., asset-> }, file_link{ ..., file { asset-> } } } }
  `;
  const { documents = [] } = useQuery(query, {
    page_id: "about_page",
  });
  const page = get(documents, "[0]", {}) as SanityDocument;
  const { content_blocks = [] } = page;
  if (!content_blocks && content_blocks.length) {
    return null;
  }

  return (
    <motion.div className="flex flex-col gap-10 px-4 font-raleway lg:px-0">
      {content_blocks.map(
        (
          content_block: {
            _key: string;
          } & Content_block,
          index: number,
        ) => (
          <ContentBlock
            key={`content_block_${index}`}
            content_block={content_block}
            // justified={index % 2 === 0 ? "right" : "left"}
            justified={index % 2 === 0 ? "left" : "right"}
          />
        ),
      )}
    </motion.div>
  );
}
