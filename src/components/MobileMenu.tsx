import cx from "classnames";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import { NAV_OPTIONS } from "../config";
import Icon from "./Icon";

export default function MobileMenu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <motion.div className="fixed bottom-3 z-50 flex w-full justify-center">
      <div
        className={cx(
          "mx-2 flex grow justify-center gap-6 rounded-full p-3",
          cx(
            isHomePage
              ? "bg-night-100 bg-opacity-50 text-stars-100"
              : "bg-dune-100 bg-opacity-50 text-night-100",
          ),
        )}
      >
        {NAV_OPTIONS.map((button) => (
          <div key={button.label} onClick={() => navigate(button.pathname)}>
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
      </div>
    </motion.div>
  );
}
