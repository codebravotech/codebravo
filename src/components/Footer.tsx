import cx from "classnames";

import { useDisplay } from "../hooks/display";

export default function Footer() {
  const { isMobile } = useDisplay();

  const logo = `/images/logo_black.svg`;

  return (
    <div
      className={cx(
        isMobile
          ? "mb-32 flex-col-reverse justify-start"
          : "flex-row justify-between",
        "flex items-center px-6 pb-2 pt-10 text-xs lg:text-sm",
      )}
    >
      <div>© {new Date().getFullYear()} CodeBRAVO, L.L.C</div>
      <div className="flex items-center gap-2 italic">
        <img src={logo} className="h-8 lg:h-12" />
        Elegant Code, Exceptional Service.
      </div>
    </div>
  );
}
