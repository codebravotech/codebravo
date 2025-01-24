import cx from "classnames";
import { Tooltip } from "react-tooltip";

import { TechnologyToolObject } from "../types/components";

export default function TechnologyTools({
  technology_tools = [],
}: {
  technology_tools: TechnologyToolObject[];
}) {
  const link_color = "stars-100";

  if (!(technology_tools?.length > 0)) {
    return null;
  }

  return (
    <div>
      <div className="mb-2 underline">The tech:</div>
      <ul className="flex flex-col items-start">
        {technology_tools.map((object) => {
          const { used_for, technology_tool } = object;
          const { technology_link, _id } = technology_tool;
          return (
            <li key={_id} className="relative mt-1">
              <a
                className={cx("underline-appear-white")}
                style={{
                  color: `var(--${link_color})`,
                  borderColor: `var(--${link_color})`,
                }}
                target="_blank"
                rel="noreferrer noopener"
                href={technology_link?.url}
                data-tooltip-id={`technology_${technology_tool?.name}`}
                data-tooltip-content={used_for}
                data-tooltip-float={true}
                data-tooltip-place="bottom-start"
              >
                {technology_link?.label}
              </a>

              <Tooltip
                id={`technology_${technology_tool?.name}`}
                arrowColor="transparent"
                className={cx(
                  "z-50 mt-2 rounded-xl bg-stars-100 px-2 py-1 font-raleway text-xs text-night-100",
                )}
                disableStyleInjection={true}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
