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
      return <PopcornText text={text} className="h1" />;
    },
    h2: ({ children }) => {
      const text = React.Children.toArray(children).join("");
      return <PopcornText text={text} className="h2" />;
    },
    h3: ({ children }) => {
      const text = React.Children.toArray(children).join("");
      return <PopcornText text={text} className="h3" />;
    },
    h4: ({ children }) => {
      const text = React.Children.toArray(children).join("");
      return <PopcornText text={text} className="h4" />;
    },
    h5: ({ children }) => {
      const text = React.Children.toArray(children).join("");
      return <PopcornText text={text} className="h5" />;
    },
    h6: ({ children }) => {
      const text = React.Children.toArray(children).join("");
      return <PopcornText text={text} className="h6" />;
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
