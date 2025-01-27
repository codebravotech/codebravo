import cx from "classnames";

import { useProjectThumbnail } from "../hooks/documents";
import { ProjectDocument } from "../types/components";

export default function ExpandedProjectCard({
  project,
  // modalOpen = false,
  className = "",
  handleClose,
}: {
  project: ProjectDocument;
  // modalOpen: boolean;
  handleClose: () => void;
  className?: string;
}) {
  const thumbnail = useProjectThumbnail(project);
  return (
    <div className={cx(className)}>
      <div onClick={handleClose}>CLOSE</div>
      <img
        src={thumbnail?.asset?.url}
        alt={project.title}
        className={cx("h-full w-full rounded object-cover")}
      />
    </div>
  );
}
