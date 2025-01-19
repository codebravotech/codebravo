import { PortableTextBlock } from "@portabletext/types";
import { motion } from "framer-motion";
import groq from "groq";
import { get } from "lodash";

import PortableTextPopcorn from "../components/PortableTextPopcorn";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { useQuery } from "../hooks/sanity";
import { useSystemStore } from "../state/system";
import { ProjectObject } from "../types/components";

export default function Portfolio() {
  const { openProjectId, clickedCardBoundingBox } = useSystemStore();
  const query = groq`
  *[_id == $page_id]{ ..., "projects": projects[]->{ ..., "thumbnailAlt": thumbnail.alt, "thumbnailAsset": thumbnail.asset->{ ... } } }
`;
  const { documents = [] } = useQuery(query, {
    page_id: "portfolio_page",
  });
  const page = get(documents, "[0]", {});
  const header = get(page, "header", []) as PortableTextBlock[];
  const projects = get(page, "projects", []) as ProjectObject[];
  const openProject = projects.find((project) => project._id === openProjectId);

  return (
    <motion.div className="relative flex h-full w-full flex-col items-center">
      <div className="highlighter-underline relative mb-10">
        <PortableTextPopcorn content={header} />
      </div>

      {openProject && clickedCardBoundingBox && (
        <ProjectModal project={openProject} />
      )}

      <div className="flex w-full flex-row flex-wrap justify-center gap-6 px-4">
        {projects.map((project) => {
          return (
            <ProjectCard
              project={project}
              key={`project_card_${project?._id}`}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
