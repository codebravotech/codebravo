import cx from "classnames";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import { NAV_OPTIONS } from "../config";
import Icon from "./Icon";

export default function MobileMenu({ isHomePage = false }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <motion.div
      className={cx(
        "glass-menu fixed bottom-4 left-0 right-0 z-50 mx-4 mb-2 flex flex-row items-center justify-evenly rounded-full p-2 shadow-xl",
      )}
    >
      {NAV_OPTIONS.map((button) => (
        <div
          className={cx(
            "glass-menu relative rounded-full p-[10px]",
            pathname === button.pathname
              ? isHomePage
                ? "border-[2px] border-night-300 bg-transparent p-[8px]"
                : "bg-expanse-gradient"
              : "border-transparent",
          )}
          key={button.label}
          onClick={() => navigate(button.pathname)}
        >
          <Icon
            icon={button.icon}
            className={cx(
              "h-10 w-10",
              button.icon === "portfolio" && "relative bottom-[2px]",
              button.icon === "connect" && "scale-[1.03]",
            )}
          />
        </div>
      ))}
    </motion.div>
  );
}
