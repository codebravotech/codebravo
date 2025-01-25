import { motion } from "framer-motion";

import ArriveDirectionally from "../animations/ArriveDirectionally";
import { ProjectDocument } from "../types/components";

export default function ProjectModalBodyPrivate({
  project,
  offset = 0,
}: {
  project: ProjectDocument;
  offset?: number;
}) {
  return (
    <motion.div
      className="my-32 flex flex-col items-center text-stars-100"
      style={{ marginTop: offset }}
    >
      <div className="flex w-2/3 grow-0 flex-col items-start">
        <ArriveDirectionally keyBy={`${project?._id}_summary`}>
          <div>LOCKED, INNIT</div>
        </ArriveDirectionally>
      </div>
    </motion.div>
  );
}
