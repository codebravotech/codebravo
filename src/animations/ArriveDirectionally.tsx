import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ArriveDirectionally({
  keyBy,
  direction = "up",
  distance = 50,
  delay = 0.3,
  duration = 1,
  children,
  once = true,
  className = "",
  exit = false,
}: {
  keyBy: string;
  direction?: "up" | "right" | "left";
  distance?: number;
  delay?: number;
  duration?: number;
  children: ReactNode;
  once?: boolean;
  className?: string;
  exit?: boolean;
}) {
  return (
    <motion.div
      key={keyBy}
      className={className}
      initial={{
        opacity: 0,
        y: direction === "up" ? distance : 0,
        x:
          direction === "right"
            ? -1 * distance
            : direction === "left"
              ? distance
              : 0,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        duration,
        delay,
      }}
      exit={
        exit
          ? {
              opacity: 0,
              y: direction === "up" ? distance : 0,
              x:
                direction === "right"
                  ? -1 * distance
                  : direction === "left"
                    ? distance
                    : 0,
            }
          : {}
      }
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
}
