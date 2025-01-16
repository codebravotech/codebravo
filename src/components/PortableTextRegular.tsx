import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";
import { merge } from "lodash";

import { BaseComponents } from "./PortableTextBaseComponents";

const components: PortableTextComponents = {
  block: ({ children }) => {
    return <p>{children}</p>;
  },
};

export default function PortableTextRegular({
  content,
  link_color = "dune-100",
  icon_color = "expanse-100",
}: {
  content: PortableTextBlock[];
  link_color?: string;
  icon_color?: string;
}) {
  return (
    <PortableText
      value={content}
      components={merge(BaseComponents({ link_color, icon_color }), components)}
    />
  );
}
