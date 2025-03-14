import cx from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { HEADER_VH, NAV_OPTIONS } from "../config";
import { useDisplay } from "../hooks/display";

export default function Header({
  isHomePage,
  isProject,
  isPortfolio,
  clickedCurrentRoute,
}: {
  isHomePage: boolean;
  isProject: boolean;
  isPortfolio: boolean;
  clickedCurrentRoute?: () => void;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isMobile } = useDisplay();
  const logoColor = isPortfolio || isProject ? "white" : "black";
  const logo = `/images/logo_${logoColor}.svg`;

  return (
    <>
      {!isHomePage && (
        <div
          id="site-header"
          className={cx(
            "my-4 flex flex-row items-start font-fjalla lg:w-[98%]",
            isMobile ? "h-[15vh] justify-center" : "h-[10vh] justify-between",
            isHomePage && "hidden",
          )}
          style={{ height: `${isMobile ? HEADER_VH * 2 : HEADER_VH}vh` }}
        >
          <Link className="mt-1 h-full pl-6" to="/">
            <img className="h-full w-full" src={logo} />
          </Link>
          {!isMobile && (
            <div
              className={cx(
                "flex flex-row justify-evenly gap-4 pr-4 pt-6",
                isHomePage || isPortfolio || isProject
                  ? "text-stars-100"
                  : "text-night-400",
              )}
            >
              {NAV_OPTIONS.map((button) => (
                <div
                  key={button.label}
                  onClick={() => {
                    if (button?.pathname === pathname && clickedCurrentRoute) {
                      clickedCurrentRoute();
                    }
                    navigate(button.pathname);
                  }}
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
