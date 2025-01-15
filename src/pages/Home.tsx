import cx from "classnames";
import { motion } from "framer-motion";
import { get, isArray, isNumber } from "lodash";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import ArriveUpwardsStaggered from "../animations/ArriveUpwardsStaggered";
import PopcornText from "../animations/PopcornText";
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
  const tagline_cta = get(homePage, "tagline_cta", "");
  const tagline_path = get(homePage, "tagline_path", "");
  const skills = get(homePage, "skills", []);

  const logo = `/images/logo_black.svg`;

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
        "text-night-300 flex h-screen flex-col items-center pb-36 lg:pb-0",
        "bg-[linear-gradient(to_bottom_left,#ECA400,#a35b1f)]",
      )}
    >
      <div className="flex w-full flex-col-reverse items-center py-6 pl-6 lg:flex-row lg:justify-between lg:px-10">
        <div className="mt-8 flex flex-col flex-wrap text-xl lg:mt-10 lg:text-3xl">
          {tagline && <PopcornPortableText content={tagline} />}
          <motion.div
            initial={{
              color: "#202020",
            }}
            whileInView={{ color: "#F4EFE8" }}
            transition={{ duration: 2, delay: 2 }}
          >
            <Link to={tagline_path} className="link-appear mr-auto">
              {tagline_cta && <PopcornText text={tagline_cta} />}
            </Link>
          </motion.div>
        </div>
        <div className="flex flex-col items-center lg:self-start">
          <img className="h-40" src={logo} />
          <div className="font-fjalla mb-2 mt-1 text-3xl tracking-wider">
            CodeBRAVO
          </div>
          {!isMobile && (
            <ArriveUpwardsStaggered
              className="flex flex-col items-center gap-1"
              staggerChildren={1}
              delayChildren={2}
            >
              {NAV_OPTIONS.filter((button) => button.pathname !== pathname).map(
                (button) => (
                  <div
                    key={button.label}
                    onClick={() => navigate(button.pathname)}
                    className="underline-appear-white cursor-pointer text-2xl hover:scale-110"
                  >
                    {button.label}
                  </div>
                ),
              )}
            </ArriveUpwardsStaggered>
          )}
        </div>
      </div>
      <div className="mt-10 flex w-full flex-col gap-1 lg:mt-0 lg:h-1/2 lg:items-end lg:justify-center">
        <ArriveUpwardsStaggered
          className="flex w-full flex-col items-center gap-1 text-2xl lg:w-[40vw] lg:items-start lg:text-4xl"
          staggerChildren={1}
          delayChildren={isMobile ? 2 : 3}
          onAnimationComplete={() => {
            setListAnimationComplete(true);
          }}
        >
          <div>Front End</div>
          <div>Back End</div>
          <div>Cloud</div>
          <div className="mt-2 flex w-full flex-col flex-wrap items-start text-lg lg:flex-row lg:text-2xl">
            <div className="pr-2">
              {isAndMore ? skills[skillIndex] : "Innovative Solutions in"}
            </div>
            {listAnimationComplete && !isAndMore && (
              <div className="text-white">
                <RotatingList list={skills} listIndex={skillIndex} />
              </div>
            )}
          </div>
        </ArriveUpwardsStaggered>
      </div>
    </motion.div>
  );
}
