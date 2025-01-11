import { AnimatePresence, motion } from "framer-motion";

const RotatingList = ({
  list,
  listIndex,
}: {
  list: Array<string>;
  listIndex: number;
}) => {
  const rollVariants = {
    enter: {
      opacity: 0,
      y: "1em",
      transition: { duration: 1.2, ease: "easeOut" },
    },
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: "1em",
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  return (
    <div className="relative">
      <AnimatePresence>
        <motion.div
          key={list[listIndex]} // Ensure unique key for animation
          variants={rollVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute"
        >
          {list[listIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RotatingList;
