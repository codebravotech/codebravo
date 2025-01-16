import cx from "classnames";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import { useDisplay } from "../hooks/display";

export default function Footer({ isHomePage }: { isHomePage: boolean }) {
  const { isMobile } = useDisplay();
  const { pathname } = useLocation();
  const logo = `/images/logo_black.svg`;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className={cx(
        "mt-10 flex px-6 pb-24 pt-10 text-sm lg:items-start lg:pb-2",
        isMobile
          ? "flex-col-reverse items-center"
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
