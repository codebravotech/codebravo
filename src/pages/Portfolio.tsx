import cx from "classnames";
import { motion } from "framer-motion";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";

import PortableTextPopcorn from "../components/PortableTextPopcorn";
import ProjectCard from "../components/ProjectCard";
import { INQUIRIES } from "../config";
import { useDisplay } from "../hooks/display";
import { useSystemStore } from "../state/system";
import { ProjectDocument } from "../types/components";

export default function Portfolio() {
  const { portfolioPage, token } = useSystemStore();
  const navigate = useNavigate();
  const { isDesktopOrLaptop } = useDisplay();

  const header = get(portfolioPage, "header", []);
  const projects = get(portfolioPage, "projects", []);

  const handleOpenProject = (project: ProjectDocument) => {
    const routeId = project?.slug?.current || project?._id;
    navigate(`/project/${routeId}`);
  };

  if (!(projects?.length > 0)) {
    return null;
  }

  return (
    <>
      <div className="relative flex h-full w-full flex-row justify-center">
        <div className="highlighter-underline relative mb-10">
          <PortableTextPopcorn content={header} />
        </div>
      </div>
      <motion.div
        id="portfolio_flex_container"
        className={cx(
          isDesktopOrLaptop
            ? "flex flex-row flex-wrap items-center justify-center gap-8"
            : "flex flex-col items-center justify-start gap-10",
        )}
      >
        {projects
          .filter((project) => project?._id)
          .map((project, index) => {
            const { _id, private: isPrivate } = project;

            return (
              <motion.div
                key={`project_card_${_id}`}
                initial={{
                  opacity: 0,
                  x: -50,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 * (index + 2) }}
                onClick={() => {
                  if (isDesktopOrLaptop) {
                    if (isPrivate && !token) {
                      navigate(`/connect?inquiry=${INQUIRIES.locked_projects}`);
                    } else {
                      handleOpenProject(project);
                    }
                  }
                }}
                onTap={() => {
                  if (!isDesktopOrLaptop) {
                    if (isPrivate && !token) {
                      navigate(`/connect?inquiry=${INQUIRIES.locked_projects}`);
                    } else {
                      handleOpenProject(project);
                    }
                  }
                }}
                className="flex flex-col items-center gap-10"
              >
                <ProjectCard project={project} />
              </motion.div>
            );
          })}
      </motion.div>
    </>
  );
}
