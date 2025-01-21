import { motion } from "framer-motion";
import groq from "groq";
import { get } from "lodash";

import ContentBlock from "../components/ContentBlock";
import { useQuery } from "../hooks/sanity";
import { ContentObject } from "../types/components";

const query = groq`
*[_id == $page_id]{ ..., content_blocks[]{ ..., image { ..., asset-> }, file_link{ ..., file { asset-> } } } }
`;
const params = {
  page_id: "about_page",
};

export default function Expertise() {
  const { documents = [] } = useQuery(query, params);
  const page = get(documents, "[0]", {}) as { content_blocks: ContentObject[] };
  const content_blocks = page?.content_blocks;
  if (!(content_blocks && content_blocks?.length)) {
    return null;
  }

  return (
    <motion.div className="flex flex-col gap-10 px-4 font-raleway lg:px-0">
      {content_blocks.map((content_block: ContentObject, index: number) => (
        <ContentBlock
          key={`content_block_${index}`}
          content_block={content_block}
          // justified={index % 2 === 0 ? "right" : "left"}
          justified={index % 2 === 0 ? "left" : "right"}
        />
      ))}
    </motion.div>
  );
}
