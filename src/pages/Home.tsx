import cx from "classnames";
import { motion } from "framer-motion";
import { get, isArray, isNumber } from "lodash";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import ArriveDirectionallyStaggered from "../animations/ArriveDirectionallyStaggered";
import PopcornText from "../animations/PopcornText";
import RotatingList from "../animations/RotatingList";
import PortableTextPopcorn from "../components/PortableTextPopcorn";
import { NAV_OPTIONS } from "../config";
import { usePublicQuery } from "../hooks/api";
import { useDisplay } from "../hooks/display";
import { HomePageDocument } from "../types/components";

export default function Home() {
  const [skillIndex, setSkillIndex] = useState<number>(0);
  const [listAnimationComplete, setListAnimationComplete] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useDisplay();
  const { documents = [] } = usePublicQuery<HomePageDocument>("connect");

  const homePage = documents[0];
  const tagline = get(homePage, "tagline", []);
  const tagline_link = get(homePage, "tagline_link", "");
  const url = get(tagline_link, "url", "");
  const label = get(tagline_link, "label", "");
  const skills = get(homePage, "skills", []);

  useEffect(() => {
    let timeout = null;
    if (isArray(skills) && skills.length > 0 && listAnimationComplete) {
      timeout = setTimeout(() => {
        if (isNumber(skillIndex)) {
          setSkillIndex((skillIndex + 1) % skills.length);
        }
      }, 2000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [skills, skillIndex, listAnimationComplete]);

  if (!documents?.length) {
    return null;
  }

  const logo = `/images/logo_black.svg`;

  const isAndMore = skills[skillIndex]?.includes("and more");

  return (
    <motion.div
      className={cx(
        "relative flex h-screen flex-col items-center bg-dune-gradient pb-36 text-night-300 lg:pb-0",
      )}
    >
      <div className="absolute left-4 top-0 z-0 h-[100vh] overflow-hidden opacity-20">
        <img src="/images/logo_white.svg" className="h-[140vh]" />
      </div>
      <div className="z-10 flex w-full flex-col-reverse items-center py-6 pl-6 lg:flex-row lg:justify-between lg:px-10">
        <div className="mt-8 flex flex-col flex-wrap text-2xl lg:mt-10 lg:text-5xl">
          <PortableTextPopcorn content={tagline} />
          <Link
            to={url}
            className="underline-drawn mr-auto mt-2 text-stars-100"
          >
            {label && <PopcornText text={label} />}
          </Link>
        </div>
        <div className="flex flex-col items-center lg:self-start">
          <img className="h-48" src={logo} />
          {/* <div className="mb-2 mt-1 font-fjalla text-4xl tracking-wider">
            CodeBRAVO
          </div> */}
          {!isMobile && (
            <ArriveDirectionallyStaggered
              className="flex flex-col items-center gap-2 pt-4"
              staggerChildren={0.5}
              delayChildren={1}
            >
              {NAV_OPTIONS.filter((button) => button.pathname !== pathname).map(
                (button) => (
                  <div
                    key={button.label}
                    onClick={() => navigate(button.pathname)}
                    className="underline-appear-white cursor-pointer text-3xl hover:scale-110"
                  >
                    {button.label}
                  </div>
                ),
              )}
            </ArriveDirectionallyStaggered>
          )}
        </div>
      </div>
      <div className="mt-4 flex w-full flex-col gap-1 lg:mt-0 lg:mt-10 lg:h-1/2 lg:items-end lg:justify-center">
        <ArriveDirectionallyStaggered
          className="ml-6 flex w-full flex-col items-start gap-1 text-2xl lg:mr-20 lg:w-[40vw] lg:items-start lg:text-6xl"
          staggerChildren={0.8}
          delayChildren={isMobile ? 1 : 2}
          onAnimationComplete={() => {
            setListAnimationComplete(true);
          }}
        >
          <div>Front End</div>
          <div>Back End</div>
          <div>Cloud</div>
          <div className="mt-2 flex w-full flex-col flex-wrap items-start text-lg lg:flex-row lg:text-4xl">
            <div className="pr-2">
              {isAndMore ? skills[skillIndex] : "Innovative Solutions in"}
            </div>
            {listAnimationComplete && !isAndMore && (
              <div className="text-white">
                <RotatingList list={skills} listIndex={skillIndex} />
              </div>
            )}
          </div>
        </ArriveDirectionallyStaggered>
      </div>
    </motion.div>
  );
}
