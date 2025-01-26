import cx from "classnames";

// import { useProjectThumbnail, useProjectVideo } from "../hooks/documents";
import { useProjectThumbnail } from "../hooks/documents";
import { ProjectDocument } from "../types/components";

// import Icon from "./Icon";
// import PortableTextRegular from "./PortableTextRegular";

export default function ExpandedProjectCard({
  project,
  modalOpen = false,
  className = "",
  handleClose,
}: {
  project: ProjectDocument;
  modalOpen: boolean;
  handleClose: () => void;
  className?: string;
}) {
  // const [videoLoaded, setVideoLoaded] = useState(false);

  const thumbnail = useProjectThumbnail(project);
  // const video = useProjectVideo(project);
  // const { header = [] } = project;
  console.log(modalOpen);

  return (
    <div className={cx("overflow-y-auto", className)}>
      <div onClick={handleClose}>CLOSE</div>
      <img
        src={thumbnail?.asset?.url}
        alt={project.title}
        className={cx("h-full w-full rounded object-cover")}
      />
    </div>
  );
}

/* <VideoComponent
                className={cx("h-full w-full rounded object-cover")}
                src={video.asset.url}
                onLoadedData={() => setVideoLoaded(true)}
              /> */
