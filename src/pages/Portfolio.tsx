import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { get } from "lodash";
import { createPortal } from "react-dom";

import ModalOverlayProject from "../components/ModalOverlayProject";
// import PortableTextPopcorn from "../components/PortableTextPopcorn";
import ProjectCard from "../components/ProjectCard";
import { useAuthorizedQuery, usePublicQuery } from "../hooks/api";
import { useDisplay } from "../hooks/display";
import { useSystemStore } from "../state/system";
// import { useSystemStore } from "../state/system";
import { PortfolioPageDocument } from "../types/components";

export default function Portfolio() {
  const { openProjectId, setOpenProjectId } = useSystemStore();
  const { isDesktopOrLaptop } = useDisplay();
  const { documents: authorizedDocuments = [] } =
    useAuthorizedQuery<PortfolioPageDocument>("portfolio_authorized");
  const { documents = [] } =
    usePublicQuery<PortfolioPageDocument>("portfolio_public");

  const publicPage = get(documents, "[0]");
  const authorizedPage = get(authorizedDocuments, "[0]");
  const page = authorizedPage || publicPage || {};
  // const header = get(page, "header", []);
  const projects = get(page, "projects", []);

  const handleClose = () => {
    // Control the layout effect! This might need to be moved elsewhere for
    // the multi-step animation
    setOpenProjectId(null);
  };

  if (!(projects?.length > 0)) {
    return null;
  }

  return (
    <motion.div
      layoutScroll
      // style={{ overflow: "scroll" }}
      id="portfolio_flex_container"
      className={cx(
        isDesktopOrLaptop ? "flex-row" : "flex-col",
        "flex w-screen flex-wrap items-center justify-center gap-10 overflow-clip lg:mt-10 lg:gap-8",
      )}
    >
      {/* <div className="highlighter-underline relative mb-10">
        <PortableTextPopcorn content={header} />
      </div> */}
      {projects.map((project) => {
        const { _id } = project;

        const handleOpen = () => {
          console.log("PROJECT LAYOUT ID", _id);

          setOpenProjectId(_id);
        };

        return (
          <motion.div
            key={_id}
            layout
            layoutId={_id}
            onClick={handleOpen}
            onTap={handleOpen}
            className="flex flex-col items-center gap-10"
          >
            <ProjectCard project={project} />
          </motion.div>
        );
      })}

      {/* Modal overlay (in a portal) for the expanded card */}

      <>
        {createPortal(
          // <AnimatePresence>
          <AnimatePresence>
            {openProjectId && (
              <ModalOverlayProject
                project={projects.find(
                  (p) =>
                    p?.slug?.current === openProjectId ||
                    p?._id === openProjectId,
                )}
                handleClose={handleClose}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
      </>
    </motion.div>
  );
}
