import cx from "classnames";
import { motion } from "framer-motion";
import { get } from "lodash";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Icon from "../components/Icon";
import PortableTextRegular from "../components/PortableTextRegular";
import ProjectModalBody from "../components/ProjectModalBody";
import VideoComponent from "../components/VideoComponent";
import { useDisplay } from "../hooks/display";
import { useProjectThumbnail, useProjectVideo } from "../hooks/documents";
import { useSystemStore } from "../state/system";

export default function Project({ className = "" }: { className?: string }) {
  const { portfolioPage } = useSystemStore();
  const { project_id } = useParams();

  const projects = get(portfolioPage, "projects", []);
  const project = projects?.find(
    (elem) => elem._id === project_id || elem?.slug?.current === project_id,
  );

  const navigate = useNavigate();
  const thumbnail = useProjectThumbnail(project);
  const video = useProjectVideo(project);

  const hasVideo = !!video?.asset?.url;
  const animationOffset = 100;
  const headerHeight = 100;
  const contentPadding = 20;
  const bodyOffset = headerHeight + contentPadding;

  const [videoLoaded, setVideoLoaded] = useState(false);
  const { isPortrait } = useDisplay();

  const handleClose = () => {
    navigate("/");
  };

  if (!project) {
    return null;
  }
  const { _id, header } = project;

  return (
    <motion.div
      className={cx(
        "relative h-screen w-screen overflow-y-scroll rounded bg-night-gradient bg-white text-stars-100 scrollbar-hide",
        className,
      )}
    >
      <div
        className="relative flex justify-center pt-10"
        style={{ height: headerHeight }}
      >
        <div className="underline-drawn relative mb-2 flex items-center text-center font-fjalla text-3xl lg:text-5xl">
          <PortableTextRegular content={header} />
        </div>

        {!isPortrait && (
          <div className="relative ml-4 flex flex-col justify-center text-stars-100 hover:scale-150">
            <Icon className={cx("h-6 w-6")} icon="back" onClick={handleClose} />
          </div>
        )}
      </div>

      {isPortrait && (
        <Icon
          icon="back"
          onClick={handleClose}
          className={cx(
            "fixed bottom-20 right-6 z-50 h-14 w-14 rounded-full bg-night-100 p-2",
          )}
        />
      )}

      {hasVideo ? (
        <motion.div
          key={`${_id}_modal_hero_video`}
          className="absolute left-0 h-screen w-screen object-cover"
          style={{ top: bodyOffset }}
          initial={{ opacity: 0, y: animationOffset }}
          animate={
            videoLoaded
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: animationOffset }
          }
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {
            <VideoComponent
              src={video?.asset.url}
              onLoadedData={() => setVideoLoaded(true)}
              playback_speed={video?.playback_speed}
              className={"h-screen min-w-[100vw] object-cover"}
            />
          }
        </motion.div>
      ) : (
        <motion.img
          key={`${_id}_modal_hero_image_with_vid`}
          className={cx(
            "absolute left-0 top-0 h-screen w-screen rounded object-cover",
          )}
          style={{ top: bodyOffset }}
          initial={{ opacity: 0, y: animationOffset }}
          whileInView={{ opacity: 1, y: 0 }}
          src={`${thumbnail?.asset?.url}?w=${innerWidth}&fit=clip&auto=format`}
          alt={project.title}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      )}
      {(!video || videoLoaded) && (
        <ProjectModalBody project={project} handleClose={handleClose} />
      )}
    </motion.div>
  );
}
