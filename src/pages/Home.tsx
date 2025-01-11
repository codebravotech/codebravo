import cx from "classnames";
import { motion } from "framer-motion";
import { get, isArray, isNumber } from "lodash";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ArriveUpwardsStaggered from "../animations/ArriveUpwardsStaggered";
import RotatingList from "../animations/RotatingList";
import PopcornPortableText from "../components/PopcornPortableText";
import { NAV_OPTIONS } from "../config";
import { useDisplay } from "../hooks/display";
import { useHomepage } from "../hooks/sanity";

export default function Home() {
  const [skillIndex, setSkillIndex] = useState<number>(0);
  const [listAnimationComplete, setListAnimationComplete] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useDisplay();

  const { homePage } = useHomepage();
  const tagline = get(homePage, "tagline", []);
  const skills = get(homePage, "skills", []);

  const logo = `/images/logo_white.svg`;

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

  const isAndMore = skills[skillIndex]?.includes("and more");

  return (
    <motion.div
      className={cx(
        "flex h-screen w-screen flex-col bg-namibia bg-cover bg-fixed bg-center bg-no-repeat text-white",
      )}
    >
      <div className="items-center flex w-full flex-col-reverse justify-evenly px-10 py-6 lg:h-1/2 lg:flex-row lg:justify-between">
        <div className="flex flex-col items-center justify-center text-xl lg:text-3xl lg:basis-1/2 mt-10 lg:mt-0">
          {!isMobile && (
            <div>{tagline && <PopcornPortableText content={tagline} />}</div>
          )}
        </div>
        <div className="flex flex-col items-center self-start">
          <img className="h-40" src={logo} />
          <div className="font-fjalla mb-2 text-3xl tracking-wider ">
            CodeBRAVO
          </div>
          {!isMobile && (
            <ArriveUpwardsStaggered
              className="flex flex-col items-center"
              staggerChildren={1}
              delayChildren={2}
            >
              {NAV_OPTIONS.filter((button) => button.pathname !== pathname).map(
                (button) => (
                  <div
                    key={button.label}
                    onClick={() => navigate(button.pathname)}
                    className="underline-appear cursor-pointer text-2xl hover:scale-110"
                  >
                    {button.label}
                  </div>
                ),
              )}
            </ArriveUpwardsStaggered>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col items-center lg:items-end justify-center gap-1 md:h-1/2 ">
        <ArriveUpwardsStaggered
          className="w-full lg:w-[40vw] text-2xl lg:text-4xl flex flex-col gap-1 items-center lg:items-start"
          staggerChildren={1}
          delayChildren={isMobile ? 2 : 3}
          onAnimationComplete={() => {
            setListAnimationComplete(true);
          }}
        >
          <div>Front End</div>
          <div>Back End</div>
          <div>Cloud</div>
          <div className="w-full mt-2 text-lg lg:text-2xl flex flex-col lg:flex-row items-start flex-wrap">
            <div className="pr-2">
              {isAndMore ? skills[skillIndex] : "Innovative Solutions in"}
            </div>
            {listAnimationComplete && !isAndMore && (
              <RotatingList list={skills} listIndex={skillIndex} />
            )}
          </div>
        </ArriveUpwardsStaggered>
      </div>
    </motion.div>
  );
}
