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

  const { private_header, public_header } = page;
  const openProject = projects.find((project) => project._id === openProjectId);
  const [privateProjects, publicProjects] = partition(projects, "private");
  const subheaderClasses = "mb-10 max-w-[35%] text-center";

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

      {publicProjects.length > 0 && (
        <>
          <ArriveDirectionally
            keyBy="private_header"
            direction="up"
            delay={0}
            duration={0.5}
            className={cx(subheaderClasses, "mt-10")}
          >
            <PortableTextRegular content={public_header} />
          </ArriveDirectionally>
          <div className="mb-4 flex w-full flex-row flex-wrap justify-center gap-6 px-4">
            {publicProjects.map((project, index) => {
              return (
                <ProjectCard
                  project={project}
                  key={`project_card_${project?._id}`}
                  index={index}
                />
              );
            })}
          </div>
        </>
      )}

      {privateProjects.length > 0 && (
        <>
          <ArriveDirectionally
            keyBy="public_header"
            direction="up"
            delay={0}
            duration={0.5}
            className={cx(subheaderClasses, "mt-10")}
          >
            <PortableTextRegular content={private_header} />
          </ArriveDirectionally>
          <div className="flex w-full flex-row flex-wrap justify-center gap-6 px-4">
            {privateProjects.map((project, index) => {
              return (
                <ProjectCard
                  project={project}
                  key={`project_card_${project?._id}`}
                  index={index}
                />
              );
            })}
          </div>
        </>
      )}
    </motion.div>
  );
}
