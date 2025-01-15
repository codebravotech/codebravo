import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ArriveUpwards({
  keyBy,
  distance = 30,
  delay = 1,
  duration = 1,
  children,
  once = true,
  className = "",
  exit = false,
}: {
  keyBy: string;
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
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
      }}
      exit={exit ? { opacity: 0, y: distance } : {}}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
}
