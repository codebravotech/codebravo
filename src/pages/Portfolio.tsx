import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { get } from "lodash";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useSearchParams } from "react-router-dom";

import ModalOverlayProject from "../components/ModalOverlayProject";
import PortableTextPopcorn from "../components/PortableTextPopcorn";
import ProjectCard from "../components/ProjectCard";
import { INQUIRIES } from "../config";
import { useAuthorizedQuery, usePublicQuery } from "../hooks/api";
import { useDisplay } from "../hooks/display";
import { useSystemStore } from "../state/system";
// import { useSystemStore } from "../state/system";
import { PortfolioPageDocument } from "../types/components";
import { animationPhaseIn } from "../utils/animation";

export default function Portfolio() {
  const {
    openProjectId,
    setOpenProjectId,
    animationPhase,
    setAnimationPhase,
    token,
  } = useSystemStore();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { isDesktopOrLaptop, isPortrait } = useDisplay();
  const { documents: authorizedDocuments = [] } =
    useAuthorizedQuery<PortfolioPageDocument>("portfolio_authorized");
  const { documents = [] } =
    usePublicQuery<PortfolioPageDocument>("portfolio_public");

  const publicPage = get(documents, "[0]");
  const authorizedPage = get(authorizedDocuments, "[0]");
  const page = authorizedPage || publicPage || {};
  const header = get(page, "header", []);
  const projects = get(page, "projects", []);
  const paramsId = searchParams.get("p");

  const handleOpenProject = (id: string) => {
    if (!searchParams.get("p")) {
      searchParams.set("p", id);
      setSearchParams(searchParams);
    }
    console.log("SETTING THIS SHIT");
    setAnimationPhase("CARD_SCALING_OPEN");
    setOpenProjectId(id);
  };

  useEffect(() => {
    if (paramsId && !openProjectId) {
      // Give the layout animation components time to figure their shit out if we
      // are joining via link
      setTimeout(() => {
        setAnimationPhase("CARD_SCALING_OPEN");
        setOpenProjectId(paramsId);
      }, 1000);
    }
  }, [paramsId]);

  if (!(projects?.length > 0 || !animationPhase)) {
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
            const { _id, slug, private: isPrivate } = project;
            const paramsId = slug?.current || _id;

            return (
              <motion.div
                key={`project_card_${_id}`}
                initial={{
                  x: !isPortrait ? -50 : 0,
                  y: isPortrait ? 50 : 0,
                  opacity: 0,
                }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 * index }}
                style={{ zIndex: index }}
                onClick={() => {
                  if (isDesktopOrLaptop) {
                    if (isPrivate && !token) {
                      navigate(`/connect?inquiry=${INQUIRIES.locked_projects}`);
                    } else {
                      handleOpenProject(paramsId);
                    }
                  }
                }}
                onTap={() => {
                  if (!isDesktopOrLaptop) {
                    if (isPrivate && !token) {
                      navigate(`/connect?inquiry=${INQUIRIES.locked_projects}`);
                    } else {
                      handleOpenProject(paramsId);
                    }
                  }
                }}
                className="flex flex-col items-center gap-10"
              >
                {animationPhaseIn(
                  ["MODAL_CLOSED", "CARD_SCALING_OPEN", "CARD_SCALING_CLOSED"],
                  useSystemStore.getState().animationPhase,
                ) && <ProjectCard project={project} />}
              </motion.div>
            );
          })}

        {/* Modal overlay (in a react portal rooted on the document body) for the expanded card */}
        <>
          {createPortal(
            <AnimatePresence>
              {animationPhase &&
                animationPhase !== "MODAL_CLOSED" &&
                openProjectId && (
                  <ModalOverlayProject
                    project={projects.find((p) => {
                      const { slug, _id } = p;
                      if (
                        openProjectId &&
                        (slug?.current === openProjectId ||
                          _id === openProjectId)
                      ) {
                        return true;
                      }
                      return false;
                    })}
                  />
                )}
            </AnimatePresence>,
            document.body,
          )}
        </>
      </motion.div>
    </>
  );
}
