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
    <motion.div className="absolute bottom-3 w-full flex justify-center">
      <div
        className={cx(
          "flex gap-6 rounded-full p-3 justify-center mx-2 grow",
          cx(
            isHomePage
              ? "text-white bg-black bg-opacity-50"
              : "text-black bg-black bg-opacity-10",
          ),
        )}
      >
        {NAV_OPTIONS.map((button) => (
          <div key={button.label} onClick={() => navigate(button.pathname)}>
            <Icon icon={button.icon} className="h-10 w-10" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
