import cx from "classnames";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useProjectThumbnail, useProjectVideo } from "../hooks/documents";
import { useSystemStore } from "../state/system";
import { ModalAnimationPhase, ProjectDocument } from "../types/components";
import { animationPhaseIn } from "../utils/animation";
import CtaButton from "./CtaButton";
import Footer from "./Footer";
import Header from "./Header";
import Icon from "./Icon";
import PortableTextRegular from "./PortableTextRegular";
import ProjectModalBodyPrivate from "./ProjectModalBodyPrivate";
import ProjectModalBodyPublic from "./ProjectModalBodyPublic";
import VideoBlockFullscreen from "./VideoBlockFullscreen";

export default function ProjectModalContents({
  project,
  animationPhase,
  setAnimationPhase,
  roundingClass,
}: {
  project: ProjectDocument;
  animationPhase: ModalAnimationPhase;
  setAnimationPhase: (animationPhase: ModalAnimationPhase) => void;
  roundingClass: string;
}) {
  const { setHideAppOverflow } = useSystemStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const modalOpen = animationPhase === "MODAL_OPEN";
  const roundingClassConditional = !modalOpen ? roundingClass : "";
  const contentPadding = 20;
  const swapTransitionDuration = 0.5;
  const headerOffset =
    (headerRef?.current?.getBoundingClientRect()?.height || 0) + contentPadding;
  const heroHeight =
    heroContainerRef?.current?.getBoundingClientRect().height || 0;

  // Animate out
  const handleClose = async () => {
    if (modalOpen) {
      if (searchParams.get("_id")) {
        searchParams.delete("_id");
        setSearchParams(searchParams);
      }

      // STEP 4: MODAL CONTENTS START TO DO EXIT ANIMATION
      setAnimationPhase("MODAL_CONTENTS_EXITING");
      setHideAppOverflow(false);
    }
  };

  const { _id, header, private: isPrivate, project_link } = project;
  const video = useProjectVideo(project);
  const thumbnail = useProjectThumbnail(project);

  const thumbnailUrl = thumbnail?.asset?.url;
  const alt = thumbnail?.alt;

  return (
    <motion.div className="absolute bottom-0 left-0 right-0 top-0 overflow-y-scroll overscroll-none bg-night-gradient scrollbar-hide">
      {/* Site header and page header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0 }}
        variants={{
          visible: { opacity: 1, transition: { duration: 1 } },
          hidden: { opacity: 0, transition: { duration: 0.5 } },
        }}
        animate={modalOpen ? "visible" : "hidden"}
        className={cx("relative z-20")}
      >
        <Header
          isHomePage={false}
          isPortfolio={true}
          clickedCurrentRoute={handleClose}
        />
        <div className="relative mt-6 flex justify-center">
          <div className="underline-drawn relative flex items-center text-center font-fjalla text-5xl">
            <PortableTextRegular content={header} />
          </div>
          <div className="absolute right-4 top-0 flex h-full flex-col justify-center text-stars-100 hover:scale-150">
            <Icon className="h-6 w-6" icon="back" onClick={handleClose} />
          </div>
        </div>
      </motion.div>
      {/* Invisible video to start load while animation is running */}
      {video && !videoLoaded && (
        <VideoBlockFullscreen
          key={`project_${_id}_loader_video`}
          video={video}
          thumbnail={thumbnail}
          setVideoLoaded={() => setVideoLoaded(true)}
          className={cx("absolute hidden")}
        />
      )}
      {/* Video/image header that fills the card during animate and sits at the top of the modal page when animation is done*/}
      <motion.div
        key={`project_${_id}_no_video_thumbnail`}
        className={cx(
          "absolute bottom-0 left-0 right-0 top-0 h-full w-full",
          roundingClassConditional,
        )}
        initial={{ y: 0 }}
        variants={{
          modalOpen: {
            y: headerOffset,
          },
          modalClosed: { y: 0 },
        }}
        animate={
          animationPhaseIn(
            ["MODAL_CONTENTS_ENTERING", "MODAL_OPEN"],
            animationPhase,
          )
            ? "modalOpen"
            : "modalClosed"
        }
        onAnimationComplete={() => {
          if (animationPhase === "MODAL_CONTENTS_ENTERING") {
            setAnimationPhase("MODAL_OPEN");
          }
          if (animationPhase === "MODAL_CONTENTS_EXITING") {
            setAnimationPhase("CARD_SCALING_CLOSED");
          }
        }}
        transition={{ duration: swapTransitionDuration, ease: "easeOut" }}
      >
        <motion.div
          ref={heroContainerRef}
          key={`project_${_id}_modal_header_video`}
          className="bg-red-200"
          variants={{
            visible: {
              opacity: 1,
              transition: { duration: swapTransitionDuration },
            },
            hidden: {
              opacity: 0,
              transition: { duration: swapTransitionDuration },
            },
          }}
          animate={!(video && videoLoaded && modalOpen) ? "hidden" : "visible"}
        >
          {video && (
            <VideoBlockFullscreen
              video={video}
              thumbnail={thumbnail}
              className={cx(
                roundingClassConditional,
                "absolute bottom-0 left-0 right-0 top-0 z-10",
              )}
            />
          )}
        </motion.div>
        <motion.img
          key={`project_${_id}_modal_header_img`}
          src={`${thumbnailUrl}?w=${innerWidth}&fit=clip&auto=format`}
          alt={alt}
          className={cx(
            "absolute bottom-0 left-0 right-0 top-0 z-20 h-full w-full",
          )}
          variants={{
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: modalOpen ? swapTransitionDuration : 0 },
            },
            hidden: {
              opacity: 0,
              filter: "blur(10px)",
              transition: { duration: swapTransitionDuration },
            },
          }}
          animate={video && videoLoaded && modalOpen ? "hidden" : "visible"}
        />
        {!isPrivate && project_link?.url && modalOpen && (
          <div
            className="absolute z-30 flex w-full justify-center"
            style={{
              top: (heroHeight || 0) - 80,
            }}
          >
            <div className="glass-menu rounded-full">
              <CtaButton variant="white_night" url={project_link?.url || ""}>
                {project_link?.label || "Launch Site"}
              </CtaButton>
            </div>
          </div>
        )}
      </motion.div>
      {modalOpen && (
        <>
          {isPrivate ? (
            <ProjectModalBodyPrivate
              project={project}
              offset={heroHeight + contentPadding}
            />
          ) : (
            <ProjectModalBodyPublic
              project={project}
              offset={heroHeight + contentPadding + 70}
            />
          )}
          <Footer isHomePage={false} />
        </>
      )}
    </motion.div>
  );
}
