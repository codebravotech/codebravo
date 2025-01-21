import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";
import { merge } from "lodash";

import { BaseComponents } from "./PortableTextBaseComponents";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="my-4 font-fjalla text-6xl">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="my-4 font-fjalla text-5xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="my-2 font-fjalla text-4xl">{children}</h3>
    ),
    h4: ({ children }) => <h4 className="font-fjalla text-3xl">{children}</h4>,
    h5: ({ children }) => (
      <h5 className="my-2 font-fjalla text-2xl">{children}</h5>
    ),
    h6: ({ children }) => <h6 className="font-fjalla text-xl">{children}</h6>,
    normal: ({ children }) => {
      return <p>{children}</p>;
    },
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
