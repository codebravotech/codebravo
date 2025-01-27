import cx from "classnames";
import { motion } from "framer-motion";
import { get } from "lodash";
import { createPortal } from "react-dom";

import ModalOverlayProject from "../components/ModalOverlayProject";
// import PortableTextPopcorn from "../components/PortableTextPopcorn";
import ProjectCard from "../components/ProjectCard";
// import { useAuthorizedQuery, usePublicQuery } from "../hooks/api";
import { usePublicQuery } from "../hooks/api";
import { useDisplay } from "../hooks/display";
import { useSystemStore } from "../state/system";
// import { useSystemStore } from "../state/system";
import { PortfolioPageDocument } from "../types/components";

export default function Portfolio() {
  const { openProjectId, setOpenProjectId } = useSystemStore();
  const { isDesktopOrLaptop } = useDisplay();
  // const { documents: authorizedDocuments = [] } =
  //   useAuthorizedQuery<PortfolioPageDocument>("portfolio_authorized");
  const { documents = [] } =
    usePublicQuery<PortfolioPageDocument>("portfolio_public");

  const publicPage = get(documents, "[0]");
  // const authorizedPage = get(authorizedDocuments, "[0]");
  const page = publicPage || {};
  // const page = authorizedPage || publicPage || {};
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
      // layoutScroll
      // style={
      // {
      // height: "100vh",
      // width: "100vw",
      // overflowY: "scroll",
      // overscrollBehavior: "auto",
      // }
      // }
      id="portfolio_flex_container"
      className={cx(
        isDesktopOrLaptop
          ? "flex flex-row flex-wrap items-center justify-center gap-8"
          : "flex flex-col items-center justify-start",
        // "flex flex-col items-center justify-center gap-10 lg:mt-10 lg:gap-8",
      )}
    >
      {/* <div className="highlighter-underline relative mb-10">
        <PortableTextPopcorn content={header} />
      </div> */}
      {projects
        .filter((project) => project?._id)
        .map((project) => {
          const { _id } = project;

          const handleOpen = () => {
            // SET TIMEOUT?
            setOpenProjectId(_id);
          };

          return (
            <motion.div
              key={`project_card_${_id}`}
              onClick={() => {
                if (isDesktopOrLaptop) {
                  // alert("RUNNING ONCLIK");
                  handleOpen();
                }
              }}
              onTap={() => {
                if (!isDesktopOrLaptop) {
                  // alert("RUNNING ONTAP");
                  handleOpen();
                }
              }}
              onLayoutAnimationComplete={() => {
                // alert(`COMPLETED CARD CLOSING FOR ${_id?.substring(0, 8)}`);
              }}
              className="flex flex-col items-center gap-10"
            >
              <ProjectCard project={project} />
            </motion.div>
          );
        })}

      {/* Modal overlay (in a portal) for the expanded card */}

      <>
        {createPortal(
          <div>
            {/* <AnimatePresence> */}
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
          </div>,
          // </AnimatePresence>,
          document.body,
        )}
      </>
    </motion.div>
  );
}
