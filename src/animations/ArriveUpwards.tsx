import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ArriveUpwards({
  key,
  disableAnimation = false,
  distance = 30,
  delay = 1,
  duration = 1,
  children,
  disable = false,
  once = true,
  className = "",
  exit = false,
}: {
  key: string;
  disableAnimation?: boolean;
  distance?: number;
  delay?: number;
  duration?: number;
  children: ReactNode;
  disable?: boolean;
  once?: boolean;
  className?: string;
  exit?: boolean;
}) {
  const durationCalc = disable ? 0 : duration;
  const delayCalc = disable ? 0 : delay;

  return (
    <motion.div
      key={key}
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: disableAnimation ? 0 : durationCalc,
        delay: disableAnimation ? 0 : delayCalc,
      }}
      exit={exit ? { opacity: 0, y: distance } : {}}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
}
