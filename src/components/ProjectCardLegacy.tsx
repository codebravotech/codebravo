import cx from "classnames";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { INQUIRIES } from "../config";
import { useDisplay } from "../hooks/display";
import { useProjectThumbnail } from "../hooks/documents";
import { useSystemStore } from "../state/system";
import { ProjectDocument } from "../types/components";
import Icon from "./Icon";
import PortableTextRegular from "./PortableTextRegular";

export default function ProjectCard({
  project,
  className = "",
  index = 0,
}: {
  project: ProjectDocument;
  index: number;
  className?: string;
}) {
  const { openProjectId, setOpenProjectId, token } = useSystemStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isPortrait } = useDisplay();
  const cardRef = useRef<HTMLDivElement>(null);
  const {
    _id,
    slug,
    thumbnail_overlay_color = "",
    description = [],
    client_logo,
    private: isPrivate,
  } = project;
  const isOpen = openProjectId === _id;
  const thumbnail = useProjectThumbnail(project);

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.7 },
    },
  };
  const roundingClass = "rounded-2xl";

  // We use state and then an effect to turn off the hover so that the bounding box will be the right size and not
  // stretch the ProjectModal that will render and grows based on the "openProjectId"
  const onClick = async () => {
    if (isPrivate && !token) {
      navigate(`/connect?inquiry=${INQUIRIES.locked_projects}`);
    } else {
      // if (isPortrait) {
      //   if (cardRef.current) {
      //     const originalRect = cardRef.current.getBoundingClientRect();
      //     const y = originalRect.top + window.scrollY;
      //     window.scrollTo({ top: y, behavior: "smooth" });
      //   }
      // }

      // setTimeout(
      //   () => {
      if (cardRef.current) {
        const project = slug?.current || _id;
        searchParams.set("project", project);
        setSearchParams(searchParams);
        setOpenProjectId(project);
      }
      // }
      // ,
      // isPortrait ? 500 : 0,
      // );
    }
  };

  useEffect(() => {
    const handleEvent = () => {};

    window.addEventListener("scroll", handleEvent);
    window.addEventListener("resize", handleEvent);

    return () => {
      window.removeEventListener("scroll", handleEvent);
      window.removeEventListener("resize", handleEvent);
    };
  }, [isOpen]);

  useEffect(() => {
    const searchParamsId = searchParams.get("project");
    if (
      searchParamsId &&
      (searchParamsId === _id || searchParamsId === slug?.current) &&
      !openProjectId
    ) {
      onClick();
    }
  }, [searchParams, openProjectId]);

  if (!thumbnail) {
    return null;
  }

  const {
    asset: { url },
    alt,
  } = thumbnail;

  const logoUrl = client_logo?.asset?.url;
  const logoAlt = client_logo?.alt;

  return (
    <motion.div
      id={`project_card_${project?._id}`}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 * index }}
      style={{ zIndex: index }}
      ref={cardRef}
      whileHover="hover"
      className={cx(
        className,
        isPortrait ? "max-w-[97%] basis-full" : "h-[43vh] basis-[47%]",
        "group relative grow-0 cursor-pointer overflow-hidden border-night-100 bg-transparent shadow-2xl",
        roundingClass,
        isOpen && "invisible",
      )}
      onClick={onClick}
      onTap={onClick}
    >
      {/* Image */}
      <motion.img
        src={`${url}?w=${innerWidth}&fit=clip&auto=format`}
        alt={alt}
        className="h-full w-full object-fill"
        variants={imageVariants}
      />

      {/* Overlay */}
      <motion.div
        className={cx("flex-col items-center justify-center", roundingClass)}
        style={{
          backgroundColor: thumbnail_overlay_color.trim(),
          opacity: 0,
          mixBlendMode: "multiply",
        }}
      ></motion.div>
      {/* Content */}
      <div className="invisible absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-night-400/50 px-6 text-center text-2xl text-stars-100 group-hover:visible">
        {client_logo && !isPrivate && (
          <img
            src={logoUrl}
            alt={logoAlt}
            className="max-h-[40%] max-w-[60%] object-contain"
          />
        )}
        <div className="max-w-[70%] font-raleway font-bold">
          <PortableTextRegular content={description} />
        </div>
      </div>
      {isPrivate && !token && (
        <div
          className={cx(
            "absolute inset-0 flex h-full w-full flex-col items-center justify-center",
          )}
        >
          <Icon
            icon="lock"
            className="font-night-100 z-40 max-h-[40%] max-w-[60%] object-contain text-night-100 group-hover:text-stars-100"
          />
        </div>
      )}
    </motion.div>
  );
}
