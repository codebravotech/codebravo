import { motion } from "framer-motion";
import React, { ReactNode } from "react";

const ArriveUpwardsStaggered = ({
  children,
  className = "",
  staggerChildren,
  delayChildren,
  onAnimationComplete = () => null,
}: {
  children: ReactNode;
  staggerChildren: number;
  delayChildren: number;
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeInOut", duration: 1 },
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

export default ArriveUpwardsStaggered;
