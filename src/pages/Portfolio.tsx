import cx from "classnames";
import { motion } from "framer-motion";
import { get } from "lodash";
import { createPortal } from "react-dom";

import ModalOverlayProject from "../components/ModalOverlayProject";
import PortableTextPopcorn from "../components/PortableTextPopcorn";
import ProjectCard from "../components/ProjectCard";
import { useAuthorizedQuery, usePublicQuery } from "../hooks/api";
import { useDisplay } from "../hooks/display";
import { useSystemStore } from "../state/system";
// import { useSystemStore } from "../state/system";
import { PortfolioPageDocument } from "../types/components";
import { animationPhaseIn } from "../utils/animation";

export default function Portfolio() {
  const { openProjectId, setOpenProjectId, animationPhase, setAnimationPhase } =
    useSystemStore();
  const { isDesktopOrLaptop } = useDisplay();
  const { documents: authorizedDocuments = [] } =
    useAuthorizedQuery<PortfolioPageDocument>("portfolio_authorized");
  const { documents = [] } =
    usePublicQuery<PortfolioPageDocument>("portfolio_public");

  const publicPage = get(documents, "[0]");
  const authorizedPage = get(authorizedDocuments, "[0]");
  const page = authorizedPage || publicPage || {};
  const header = get(page, "header", []);
  const projects = get(page, "projects", []);

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
          // "flex flex-col items-center justify-center gap-10 lg:mt-10 lg:gap-8",
        )}
      >
        {projects
          .filter((project) => project?._id)
          .map((project) => {
            const { _id } = project;

            const handleOpen = () => {
              setOpenProjectId(_id);
              setAnimationPhase("CARD_SCALING_OPEN");
            };

            return (
              <motion.div
                key={`project_card_${_id}`}
                onClick={() => {
                  if (isDesktopOrLaptop) {
                    handleOpen();
                  }
                }}
                onTap={() => {
                  if (!isDesktopOrLaptop) {
                    handleOpen();
                  }
                }}
                className="flex flex-col items-center gap-10"
              >
                {animationPhaseIn(
                  ["MODAL_CLOSED", "CARD_SCALING_OPEN", "CARD_SCALING_CLOSED"],
                  animationPhase,
                ) && <ProjectCard project={project} />}
              </motion.div>
            );
          })}

        {/* Modal overlay (in a react portal rooted on the document body) for the expanded card */}
        <>
          {createPortal(
            <div>
              {animationPhase !== "MODAL_CLOSED" && openProjectId && (
                // {openProjectId && (
                <ModalOverlayProject
                  project={projects.find(
                    (p) =>
                      p?.slug?.current === openProjectId ||
                      p?._id === openProjectId,
                  )}
                />
              )}
            </div>,
            document.body,
          )}
        </>
      </motion.div>
    </>
  );
}
