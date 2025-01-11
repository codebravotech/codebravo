import cx from "classnames";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { NAV_OPTIONS } from "../config";
import { useDisplay } from "../hooks/display";

export default function Header({ isHomePage }: { isHomePage: boolean }) {
  const navigate = useNavigate();
  const { isMobile } = useDisplay();
  const logo = `/images/logo_black.svg`;

  return (
    <motion.div
      className={cx(
        "mb-8 flex w-full flex-row items-start pt-4",
        isMobile ? "justify-center" : "justify-between",
        isHomePage && "hidden",
      )}
    >
      <Link className="h-20 pl-4" to="/">
        <img className="h-full w-full" src={logo} />
      </Link>
      {!isMobile && (
        <div
          className={cx(
            "flex w-1/5 flex-row justify-evenly pt-2",
            isHomePage ? "text-white" : "text-black",
          )}
        >
          {NAV_OPTIONS.map((button) => (
            <div
              key={button.label}
              onClick={() => navigate(button.pathname)}
              className="underline-appear cursor-pointer text-lg"
            >
              {button.label}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
