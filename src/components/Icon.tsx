import cx from "classnames";
import { CSSProperties } from "react";

import back from "../assets/icons/back.svg?react";
import clipboard from "../assets/icons/clipboard.svg?react";
import connect from "../assets/icons/connect.svg?react";
import home from "../assets/icons/home.svg?react";
import about from "../assets/icons/info.svg?react";
import portfolio from "../assets/icons/portfolio.svg?react";
import refresh from "../assets/icons/refresh.svg?react";
import { IconType } from "../types/components";

const componentMap = {
  back,
  clipboard,
  connect,
  portfolio,
  refresh,
  home,
  about,
};

export default function Icon({
  icon,
  className = "",
  style = {},
  onClick = () => {},
}: {
  icon: IconType;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  const SVG = componentMap[icon];

  return (
    <SVG
      className={cx(
        "!cursor-pointer fill-current active:opacity-50",
        className,
      )}
      onClick={onClick}
      style={style}
    />
  );
}
