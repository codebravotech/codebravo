import { PortableTextComponents } from "@portabletext/react";
import cx from "classnames";
import { motion } from "framer-motion";

import { SPECIAL_LINK_KEYS } from "../config";
import Icon from "./Icon";

export const BaseComponents = ({
  link_color = "dune-100",
  icon_color = "expanse-100",
}: {
  link_color?: string;
  icon_color?: string;
}): PortableTextComponents => {
  return {
    listItem: {
      bullet: ({ children }) => (
        <li className="my-1.5 ml-8 list-disc">{children}</li>
      ),
      number: ({ children }) => (
        <li className="my-2 ml-8 list-decimal">{children}</li>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        if (!value) {
          return;
        }
        const href = value.href;

        const rel = !href.startsWith("/") ? "noreferrer noopener" : undefined;

        const isMailTo = href.startsWith("mailto:");
        const email = href.split("mailto:").pop();
        const isSpecialLink = !!SPECIAL_LINK_KEYS.some((key: string) =>
          href.includes(key),
        );

        const copyEmail = () => navigator.clipboard.writeText(email);
        return (
          <span className="inline-flex flex-wrap items-center font-fjalla tracking-wide lg:flex-row">
            {isMailTo && <br className="" />}
            <a
              className={cx("link-highlight")}
              style={{
                color: `var(--${link_color})`,
                borderColor: `var(--${link_color})`,
              }}
              data-tooltip-id={
                isMailTo
                  ? "mailto_link_tooltip"
                  : isSpecialLink
                    ? "visit_special_links_tooltip"
                    : ""
              }
              data-tooltip-content={
                isMailTo ? "Message" : isSpecialLink ? "Visit" : ""
              }
              data-tooltip-float={true}
              data-tooltip-place="bottom-start"
              href={value.href}
              rel={rel}
              target="_blank"
            >
              {children}
            </a>
            {isMailTo && (
              <>
                <motion.span
                  className="mr-1 inline active:opacity-50"
                  onClick={copyEmail}
                  onTap={copyEmail}
                  data-tooltip-id={
                    isMailTo
                      ? "copy_email_tooltip"
                      : isSpecialLink
                        ? "visit_special_links_tooltip"
                        : ""
                  }
                  data-tooltip-content="Copy"
                  data-tooltip-float={true}
                  data-tooltip-place="bottom-start"
                >
                  <Icon
                    icon="clipboard"
                    className={cx("mx-2 h-6 w-6 hover:scale-[1.1]")}
                    style={{ color: `var(--${icon_color})` }}
                  />
                </motion.span>
              </>
            )}
          </span>
        );
      },
    },
  };
};
