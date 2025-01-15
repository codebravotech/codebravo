import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";
import React from "react";

import PopcornText from "../animations/PopcornText";

const components: PortableTextComponents = {
  block: ({ children }) => {
    const text = React.Children.toArray(children).join("");
    return <PopcornText text={text} />;
  },
};

const PortableTextPopcorn = ({ content }: { content: PortableTextBlock[] }) => {
  return <PortableText value={content} components={components} />;
};

export default PortableTextPopcorn;
