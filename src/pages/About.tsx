import { motion } from "framer-motion";
import groq from "groq";
import { get } from "lodash";

import ContentBlock from "../components/ContentBlock";
import { useQuery } from "../hooks/sanity";
import { Content_block } from "../types/sanity.types";

export default function About() {
  const query = groq`
    *[_id == $page_id]{ ..., content_blocks[]{ ..., "imageAlt": image.alt, "imageAsset": image.asset->{ ... }, "fileAsset": file_link.file.asset->{ ... } } }
  `;
  const { documents = [] } = useQuery(query, {
    page_id: "about_page",
  });
  const page = get(documents, "[0]", {});
  const content_blocks = get(page, "content_blocks", []);
  if (!content_blocks && content_blocks.length) {
    return null;
  }

  return (
    <motion.div className="flex flex-col gap-10 bg-stars-100 font-raleway">
      {content_blocks.map((content_block: Content_block, index: number) => (
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
