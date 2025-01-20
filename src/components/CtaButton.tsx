import cx from "classnames";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";

export default function CtaButton({
  children,
  url,
  style = {},
  variant = "white_blue",
}: {
  children: React.ReactNode;
  url?: string;
  style?: CSSProperties;
  variant: "white_blue" | "dune_black";
}) {
  const parentClass =
    "font-fjalla mt-5 lg:self-end min-w-48 rounded-full px-6 py-4 text-2xl lg:text-2xl font-bold tracking-wider shadow-xl transition-all duration-300 ease-in-out flex flex-col text-center leading-tight items-center";

  const colorClass = "bg-stars-100 text-expanse-100 hover:text-dune-100";
  switch (variant) {
    case "white_blue":
      break;
    case "dune_black":
      break;
    default:
      break;
  }

  if (url) {
    if (url.startsWith("https")) {
      return (
        <a
          href={url}
          target="_blank"
          className={cx(parentClass, colorClass)}
          style={style}
        >
          {children}
        </a>
      );
    } else if (url.startsWith("/")) {
      return (
        <Link to={url} className={cx(parentClass, colorClass)} style={style}>
          {children}
        </Link>
      );
    }
  }
}
