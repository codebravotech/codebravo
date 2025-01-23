import cx from "classnames";

import { TechnologyToolObject } from "../types/components";

export default function TechnologyTools({
  technology_tools = [],
}: {
  technology_tools: TechnologyToolObject[];
}) {
  const link_color = "dune-100";

  if (!(technology_tools?.length > 0)) {
    return null;
  }

  return (
    <>
      <h3 className="underline">The Tech</h3>
      <ul>
        {technology_tools.map((object) => {
          const { used_for, technology_tool } = object;
          const { technology_link, _id } = technology_tool;
          return (
            <li key={_id}>
              <a
                className={cx("link-highlight")}
                style={{
                  color: `var(--${link_color})`,
                  borderColor: `var(--${link_color})`,
                }}
                target="_blank"
                rel="noreferrer noopener"
                href={technology_link?.url}
              >
                {technology_link?.label}
              </a>
              <span> -- {used_for}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
