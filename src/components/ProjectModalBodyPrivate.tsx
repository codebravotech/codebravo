import { motion } from "framer-motion";

import ArriveDirectionally from "../animations/ArriveDirectionally";
import { ProjectDocument } from "../types/components";
import CtaButton from "./CtaButton";
import Partners from "./Partners";
import PortableTextRegular from "./PortableTextRegular";
import TechnologyTools from "./TechnologyTools";

export default function ProjectModalBodyPrivate({
  project,
  offset = 0,
}: {
  project: ProjectDocument;
  offset?: number;
}) {
  const {
    private_project_summary,
    partners,
    technology_tools,
    final_cta,
    cta_link,
  } = project;

  return (
    <motion.div
      className="my-32 flex flex-col items-center text-stars-100"
      style={{ marginTop: offset }}
    >
      <div className="flex w-2/3 grow-0 flex-col items-start">
        <ArriveDirectionally keyBy={`${project?._id}_summary`}>
          <PortableTextRegular content={private_project_summary} />
          <div className="mt-2 text-xs italic">
            *Certain details redacted in compliance with non-disclosure
            agreements.
          </div>
        </ArriveDirectionally>
        <ArriveDirectionally keyBy={`${project?._id}_collaborators`}>
          <Partners partners={partners} />
        </ArriveDirectionally>
        <ArriveDirectionally keyBy={`${project?._id}_technology_tools`}>
          <TechnologyTools technology_tools={technology_tools} />
        </ArriveDirectionally>
        <ArriveDirectionally
          keyBy={`${project?._id}_technology_tools`}
          className="h6 mt-10 flex w-full flex-col items-center"
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
      </div>
    </motion.div>
  );
}
