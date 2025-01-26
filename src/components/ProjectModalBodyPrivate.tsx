import { motion } from "framer-motion";

import ArriveDirectionally from "../animations/ArriveDirectionally";

export default function ProjectModalBodyPrivate({
  offset = 0,
}: {
  offset?: number;
}) {
  return (
    <motion.div
      className="my-32 flex flex-col items-center text-stars-100"
      style={{ marginTop: offset }}
    >
      <div className="flex w-2/3 grow-0 flex-col items-start">
        <ArriveDirectionally keyBy={`locked info`}>
          <div>THIS IS LOCKED</div>
        </ArriveDirectionally>
      </div>
    </motion.div>
  );
}
