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
        isMobile
          ? "flex-col-reverse justify-start"
          : "flex-row justify-between",
        isHomePage && "hidden",
        "flex items-center px-6 pb-2 pt-10 text-xs lg:text-sm",
      )}
    >
      <div>© {new Date().getFullYear()} CodeBRAVO, L.L.C</div>
      <div className="flex items-center gap-2 italic">
        <img src={logo} className="h-8 lg:h-12" />
        Elegant Code, Exceptional Service.
      </div>
    </motion.div>
  );
}
