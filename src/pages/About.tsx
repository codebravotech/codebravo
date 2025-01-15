import { motion } from "framer-motion";
import { useQuery } from "../hooks/sanity";
import { get } from "lodash";
import ContentBlock from "../components/ContentBlock";
import groq from "groq";
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
    <motion.div className="bg-stars-100 font-raleway flex h-screen w-screen flex-col gap-10 overflow-scroll pb-44 pt-6 lg:pb-0">
      {content_blocks.map((content_block: Content_block, index: number) => (
        <ContentBlock
          key={`content_block_${index}`}
          content_block={content_block}
          justified={index % 2 === 0 ? "right" : "left"}
          // justified={index % 2 === 0 ? "left" : "right"}
        />
      ))}
    </motion.div>
  );
}
