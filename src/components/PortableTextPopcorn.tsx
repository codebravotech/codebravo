import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";
import { merge } from "lodash";
import React from "react";

import PopcornText from "../animations/PopcornText";
import { BaseComponents } from "./PortableTextBaseComponents";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => {
      const text = React.Children.toArray(children).join("");
      return <PopcornText text={text} />;
    },
    h1: ({ children }) => {
      const text = React.Children.toArray(children).join("");
      return <PopcornText text={text} className="mb-2 font-fjalla text-6xl" />;
    },
  },
};

const PortableTextPopcorn = ({ content }: { content: PortableTextBlock[] }) => {
  return (
    <PortableText
      value={content}
      components={merge(BaseComponents({}), components)}
    />
  );
};

export default PortableTextPopcorn;
