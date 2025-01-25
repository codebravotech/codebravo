import cx from "classnames";
import { motion } from "framer-motion";
import groq from "groq";
import { get, partition } from "lodash";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ArriveDirectionally from "../animations/ArriveDirectionally";
import PortableTextPopcorn from "../components/PortableTextPopcorn";
import PortableTextRegular from "../components/PortableTextRegular";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { useQuery } from "../hooks/sanity";
import { useSystemStore } from "../state/system";
import { PortfolioPageDocument } from "../types/components";

const query = groq`
*[_id == $page_id]{ ..., projects[]->{ ..., thumbnails[] { ..., asset-> }, client_logo { ..., asset-> }, videos[] { ..., asset-> }, technology_tools[] { ..., technology_tool-> }, partners[] { ..., partner-> }, public_content_blocks[] { ..., images[] { ..., asset-> }, videos[] { ..., asset-> } }  } }
`;
const params = {
  page_id: "portfolio_page",
};

export default function Portfolio() {
  const { openProjectId, setOpenProjectId, clickedCardBoundingBox } =
    useSystemStore();
  const [searchParams] = useSearchParams();

  const { documents = [] } = useQuery(query, params);
  const page = get(documents, "[0]", {}) as PortfolioPageDocument;
  const header = get(page, "header", []);
  const projects = get(page, "projects", []);

  const openProject = projects.find((project) => project._id === openProjectId);

  useEffect(() => {
    if (!searchParams.get("_id")) {
      setOpenProjectId(null);
    }
  }, []);

  return (
    <motion.div
      className={cx("relative flex h-full w-full flex-col items-center")}
    >
      <div className="highlighter-underline relative mb-10">
        <PortableTextPopcorn content={header} />
      </div>

      {openProject && clickedCardBoundingBox && (
        <ProjectModal project={openProject} />
      )}

      {projects.length > 0 && (
        <div className="mb-4 flex w-full flex-row flex-wrap justify-center gap-6 px-4">
          {projects.map((project, index) => {
            return (
              <ProjectCard
                project={project}
                key={`project_card_${project?._id}`}
                index={index}
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
