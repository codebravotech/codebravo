import cx from "classnames";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { NAV_OPTIONS } from "../config";
import Icon from "./Icon";

export default function MobileMenu() {
  const navigate = useNavigate();
  return (
    <motion.div className="glass_menu fixed bottom-16 left-0 right-0 z-50 mx-4 mb-2 flex h-14 flex-row items-center justify-evenly rounded-full p-2 shadow-xl">
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
    </motion.div>
  );
}
