import cx from "classnames";

import portfolio from "../../assets/icons/portfolio.svg?react";
import contact from "../../assets/icons/portfolio.svg?react";

const componentMap = {
  portfolio,
  contact,
};

export default function Icon({
  icon,
  className = "",
  onClick = () => {},
}: {
  icon: "portfolio" | "contact";
  className?: string;
  onClick?: () => void;
}) {
  const SVG = componentMap[icon];

  return <SVG className={cx("fill-current", className)} onClick={onClick} />;
}
