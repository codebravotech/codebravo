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
    "font-fjalla   z-10 mt-6 self-end rounded-md px-4 py-2 text-4xl font-bold tracking-wider shadow-xl transition-all duration-300 ease-in-out";

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
