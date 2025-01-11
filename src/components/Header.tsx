import cx from "classnames";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { navOptionsFactory } from "../config";
import { Link } from "react-router-dom";

export default function Header({ isHomePage }: { isHomePage: boolean }) {
  const navigate = useNavigate();
  const logo = `/images/logo_black.svg`;

  return (
    <motion.div
      className={cx(
        "mb-8 flex w-full flex-row items-start justify-between pt-4",
        isHomePage && "hidden",
      )}
    >
      <Link className="h-20" to="/">
        <img className="h-full w-full" src={logo} />
      </Link>
      <div
        className={cx(
          "flex w-1/5 flex-row justify-evenly",
          isHomePage ? "text-white" : "text-black",
        )}
      >
        {navOptionsFactory(navigate).map((button) => (
          <div onClick={button.action}>{button.label}</div>
        ))}
      </div>
    </motion.div>
  );
}
