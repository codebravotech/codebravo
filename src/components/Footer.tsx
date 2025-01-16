import cx from "classnames";
import { motion } from "framer-motion";

import { useDisplay } from "../hooks/display";

export default function Footer({ isHomePage }: { isHomePage: boolean }) {
  const { isMobile } = useDisplay();
  const logo = `/images/logo_black.svg`;

  return (
    <motion.div
      className={cx(
        "flex items-start bg-stars-100 px-4 pb-32 text-sm lg:pb-2",
        isMobile
          ? "flex-col justify-center"
          : "flex-row items-end justify-between",
        isHomePage && "hidden",
      )}
    >
      <div>© {new Date().getFullYear()} CodeBRAVO, L.L.C</div>
      <div className="flex items-center gap-2 italic">
        <img src={logo} className="h-10" />
        Elegant Code, Exceptional Service.
      </div>
    </motion.div>
  );
}
