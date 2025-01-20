import cx from "classnames";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { NAV_OPTIONS } from "../config";
import { useDisplay } from "../hooks/display";

export default function Header({
  isHomePage,
  isPortfolio,
}: {
  isHomePage: boolean;
  isPortfolio: boolean;
}) {
  const navigate = useNavigate();
  const { isMobile } = useDisplay();
  const logoColor = isPortfolio ? "white" : "black";
  const logo = `/images/logo_${logoColor}.svg`;

  return (
    <>
      {!isHomePage && (
        <div
          className={cx(
            "flex flex-row items-start pt-2 font-fjalla lg:w-[98%]",
            isMobile ? "justify-center" : "justify-between",
            isHomePage && "hidden",
          )}
        >
          <Link className="mb-2 h-24 pl-6" to="/">
            <img className="h-full w-full" src={logo} />
          </Link>
          {!isMobile && (
            <div
              className={cx(
                "flex flex-row justify-evenly gap-4 pr-4 pt-8",
                isHomePage || isPortfolio ? "text-stars-100" : "text-night-400",
              )}
            >
              {NAV_OPTIONS.map((button) => (
                <div
                  key={button.label}
                  onClick={() => navigate(button.pathname)}
                  className="underline-appear cursor-pointer text-lg"
                >
                  {button.short_label}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
