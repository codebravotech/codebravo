import cx from "classnames";
import { Tooltip } from "react-tooltip";

import { useDisplay } from "../hooks/display";
import { TechnologyToolObject } from "../types/components";

export default function TechnologyTools({
  technology_tools = [],
}: {
  technology_tools: TechnologyToolObject[];
}) {
  const link_color = "stars-100";
  const { isDesktopOrLaptop } = useDisplay();

  if (!(technology_tools?.length > 0)) {
    return null;
  }

  return (
    <div>
      <div className="text-xl underline">Project Tech:</div>
      <ul className="flex flex-col items-center text-lg">
        {technology_tools.map((object) => {
          const { used_for, technology_tool } = object;
          if (!technology_tool) {
            return null;
          }

          const { _id, technology_link, name } = technology_tool;

          return (
            <div className="relative mt-1" key={`${_id}_list_item`}>
              <li>
                <a
                  className={cx("underline-appear-white")}
                  style={{
                    color: `var(--${link_color})`,
                    borderColor: `var(--${link_color})`,
                  }}
                  target="_blank"
                  rel="noreferrer noopener"
                  href={technology_link?.url}
                  data-tooltip-id={`technology_${name}`}
                  data-tooltip-content={used_for}
                  data-tooltip-float={true}
                  data-tooltip-place="bottom-start"
                >
                  {technology_link?.label}
                </a>
              </li>
              {!isDesktopOrLaptop && (
                <div className="mb-2 italic">{used_for}</div>
              )}
            </div>
          );
        })}
      </ul>

      {technology_tools.map((object) => {
        const { technology_tool } = object;
        const { _id } = technology_tool;

        return (
          <Tooltip
            key={`${_id}_tooltip`}
            id={`technology_${object?.technology_tool?.name}`}
            arrowColor="transparent"
            className={cx(
              "z-50 mt-2 rounded-xl bg-stars-100 px-2 py-1 font-raleway text-xs text-night-100",
            )}
            disableStyleInjection={true}
          />
        );
      })}
    </div>
  );
}
