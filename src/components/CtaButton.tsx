import { CSSProperties } from "react";
import { Link } from "react-router-dom";

export default function CtaButton({
  label,
  url,
  style = {},
}: {
  label: string;
  url?: string;
  style?: CSSProperties;
}) {
  const parentClass =
    "bg-dune-gradient text-stars-300 cursor-pointer rounded-md px-4 py-3 text-2xl font-fjalla";

  if (url) {
    if (url.startsWith("https")) {
      return (
        <a href={url} target="_blank" className={parentClass} style={style}>
          {label}
        </a>
      );
    } else if (url.startsWith("/")) {
      return (
        <Link to={url} className={parentClass} style={style}>
          {label}
        </Link>
      );
    }
  }
}
