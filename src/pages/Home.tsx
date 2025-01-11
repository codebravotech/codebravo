import { motion } from "framer-motion";
import cx from "classnames";
import { navOptionsFactory } from "../config";
import { useNavigate } from "react-router-dom";
import { useHomepage } from "../hooks/sanity";

export default function Home() {
  const navigate = useNavigate();
  const { homePage } = useHomepage();
  const logo = `/images/logo_white.svg`;

  console.log("HOME PAGE: ", homePage);

  return (
    <motion.div
      className={cx(
        "flex h-screen w-screen flex-col bg-namibia bg-cover bg-fixed bg-center bg-no-repeat text-white",
      )}
    >
      <div className="items-between flex h-full w-full flex-col-reverse justify-evenly px-10 py-6 lg:h-1/2 lg:flex-row lg:justify-between">
        <div className="flex flex-col items-center justify-center text-lg lg:ml-16 lg:basis-1/2"></div>
        <div className="flex flex-col items-center">
          <img className="h-80" src={logo} />
          <div className="font-fjalla mb-2 text-2xl tracking-wider">
            CodeBRAVO
          </div>
          {navOptionsFactory(navigate).map((button) => (
            <div
              className="cursor-pointer text-xl hover:text-2xl"
              onClick={button.action}
            >
              {button.long_label}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col items-end justify-center gap-1 pr-80 lg:h-1/2">
        <div className="text-4xl">Front End</div>
        <div className="text-4xl">Back End</div>
        <div className="text-4xl">Cloud</div>
        <div className="mt-2 text-2xl">Innovative Solutions in: </div>
      </div>
    </motion.div>
  );
}
