import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";
import { merge } from "lodash";

import { BaseComponents } from "./PortableTextBaseComponents";

const components: PortableTextComponents = {
  marks: {
    highlighted: ({ children }) => (
      <span className="rounded-sm bg-expanse-100 px-[2px] text-night-300">
        {children}
      </span>
    ),
  },
  block: {
    h1: ({ children }) => <div className="h1">{children}</div>,
    h2: ({ children }) => <div className="h2">{children}</div>,
    h3: ({ children }) => <div className="h3">{children}</div>,
    h4: ({ children }) => <div className="h4">{children}</div>,
    h5: ({ children }) => <div className="h5">{children}</div>,
    h6: ({ children }) => <div className="h6">{children}</div>,
    normal: ({ children }) => {
      return <p>{children}</p>;
    },
    large_body: ({ children }) => {
      return <p className="text-xl">{children}</p>;
    },
    xl_body: ({ children }) => {
      return <p className="text-2xl">{children}</p>;
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
