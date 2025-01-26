import { motion } from "framer-motion";

import ArriveDirectionally from "../animations/ArriveDirectionally";
import { ModalAnimationPhase, ProjectDocument } from "../types/components";
import AssetAndCopyContentBlock from "./ContentBlocks/AssetAndCopyContentBlock";
import CopyContentBlock from "./ContentBlocks/CopyContentBlock";
import CtaButton from "./CtaButton";
import Icon from "./Icon";
import Partners from "./Partners";
import PortableTextRegular from "./PortableTextRegular";
import TechnologyTools from "./TechnologyTools";

export default function ProjectModalBody({
  project,
  offset = 0,
  handleClose,
  animationPhase,
}: {
  project: ProjectDocument;
  offset: number;
  handleClose: () => void;
  animationPhase: ModalAnimationPhase;
}) {
  const public_content_blocks = project?.public_content_blocks || [];
  const final_cta = project?.final_cta || [];
  const cta_link = project?.cta_link;
  const partners = project?.partners || [];
  const technology_tools = project?.technology_tools || [];
  const isOpen = animationPhase === "MODAL_OPEN";

  return (
    <motion.div
      className="flex w-full flex-col items-center gap-4 text-stars-100 lg:gap-20"
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
        keyBy={`${project?._id}_cta`}
        className="mt-10 flex w-full flex-col items-center text-center text-xl"
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

        <div
          onClick={handleClose}
          className="mt-4 flex cursor-pointer items-center text-sm hover:scale-110"
        >
          <Icon className="h-6 w-6" icon="back" />
          <span>Portfolio</span>
        </div>
      </ArriveDirectionally>

      {(partners?.length > 0 || technology_tools?.length > 0) && isOpen && (
        <ArriveDirectionally
          keyBy={`${project?._id}_collaborators and tech`}
          className="flex w-full flex-col justify-center gap-10 text-center lg:flex-col"
        >
          {partners?.length > 0 && <Partners partners={partners} />}
          {technology_tools?.length > 0 && (
            <TechnologyTools technology_tools={technology_tools} />
          )}
        </ArriveDirectionally>
      )}
    </motion.div>
  );
}
