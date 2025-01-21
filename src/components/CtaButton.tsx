import cx from "classnames";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";

export default function CtaButton({
  children,
  url,
  style = {},
  className,
  variant = "white_blue",
}: {
  children: React.ReactNode;
  url: string;
  style?: CSSProperties;
  className?: string;
  variant: "white_blue" | "dune_black" | "trash_panda";
}) {
  const parentClass =
    "font-fjalla lg:self-end min-w-48 rounded-full px-6 py-4 text-2xl lg:text-2xl font-bold tracking-wider shadow-xl transition-all duration-300 ease-in-out flex flex-col text-center leading-tight items-center";

  let colorClass = "bg-stars-100 text-expanse-100 hover:text-dune-100";
  switch (variant) {
    case "trash_panda":
      colorClass =
        "text-trash-panda-button hover:text-stars-100 border-2 border-trash-panda-button";
      break;
    case "white_blue":
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
          className={cx(parentClass, colorClass, className)}
          style={style}
        >
          {children}
        </a>
      );
    } else if (url.startsWith("/")) {
      return (
        <Link
          to={url}
          className={cx(parentClass, colorClass, className)}
          style={style}
        >
          {children}
        </Link>
      );
    }
  }
}
