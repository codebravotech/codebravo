import { motion } from "framer-motion";

import ArriveDirectionally from "../animations/ArriveDirectionally";
import { ProjectDocument } from "../types/components";
import AssetAndCopyContentBlock from "./ContentBlocks/AssetAndCopyContentBlock";
import CopyContentBlock from "./ContentBlocks/CopyContentBlock";
import CtaButton from "./CtaButton";
import Partners from "./Partners";
import PortableTextRegular from "./PortableTextRegular";
import TechnologyTools from "./TechnologyTools";

export default function ProjectModalBodyPublic({
  project,
  offset = 0,
}: {
  project: ProjectDocument;
  offset: number;
}) {
  const public_content_blocks = project?.public_content_blocks || [];
  const final_cta = project?.final_cta || [];
  const cta_link = project?.cta_link;
  const partners = project?.partners || [];
  const technology_tools = project?.technology_tools || [];

  return (
    <motion.div
      className="flex w-full flex-col items-center gap-10 text-stars-100"
      style={{ marginTop: offset }}
    >
      {public_content_blocks.map((content_block) => {
        const { _key, block_type } = content_block;

        switch (block_type) {
          case "copy_only":
            return (
              <CopyContentBlock key={_key} content_block={content_block} />
            );
          case "asset_only":
          case "copy_and_asset":
            return (
              <AssetAndCopyContentBlock
                key={_key}
                content_block={content_block}
                assetOnly={block_type === "asset_only"}
              />
            );
          default:
            return null;
        }
      })}

      <ArriveDirectionally
        keyBy={`${project?._id}_collaborators and tech`}
        className="flex flex-row gap-32"
      >
        <Partners partners={partners} />
        <TechnologyTools technology_tools={technology_tools} />
      </ArriveDirectionally>

      <ArriveDirectionally
        keyBy={`${project?._id}_cta`}
        className="mt-10 flex w-full flex-col items-center text-xl"
      >
        <PortableTextRegular content={final_cta} />
        {cta_link?.url && cta_link?.label && (
          <CtaButton
            url={cta_link?.url}
            variant="black_dune"
            className="mt-4 grow-0"
          >
            {cta_link?.label}
          </CtaButton>
        )}
      </ArriveDirectionally>
    </motion.div>
  );
}
