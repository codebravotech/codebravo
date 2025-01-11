import cx from "classnames";

import connect from "../assets/icons/connect.svg?react";
import home from "../assets/icons/home.svg?react";
import about from "../assets/icons/info.svg?react";
import portfolio from "../assets/icons/portfolio.svg?react";
import { IconType } from "../types/components";

const componentMap = {
  connect,
  portfolio,
  home,
  about,
};

export default function Icon({
  icon,
  className = "",
  onClick = () => {},
}: {
  icon: IconType;
  className?: string;
  onClick?: () => void;
}) {
  const SVG = componentMap[icon];

  return <SVG className={cx("fill-current", className)} onClick={onClick} />;
}
