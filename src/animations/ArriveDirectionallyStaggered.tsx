import { motion } from "framer-motion";
import React, { ReactNode } from "react";

const ArriveDirectionallyStaggered = ({
  children,
  className = "",
  direction = "up",
  distance = 50,
  staggerChildren,
  delayChildren,
  duration = 1,
  onAnimationComplete = () => null,
}: {
  children: ReactNode;
  direction?: "up" | "right";
  distance?: number;
  staggerChildren: number;
  delayChildren: number;
  duration?: number;
  className?: string;
  onAnimationComplete?: () => void;
}) => {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  const itemVariant = {
    hidden: {
      opacity: 1,
      y: direction === "up" ? distance : 0,
      x: direction === "right" ? -1 * distance : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeInOut", duration },
    },
  };

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onAnimationComplete}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariant}>{child}</motion.div>
      ))}
    </motion.div>
  );
};

export default ArriveDirectionallyStaggered;
