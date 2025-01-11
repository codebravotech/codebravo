import {
  PortableText,
  PortableTextComponents,
  ReactPortableTextList,
} from "@portabletext/react";
import React from "react";

import PopcornText from "../animations/PopcornText";

const components: PortableTextComponents = {
  block: ({ children }) => {
    const text = React.Children.toArray(children).join("");
    return <PopcornText text={text} />;
  },
};

const PopcornPortableText = ({
  content,
}: {
  content: ReactPortableTextList;
}) => {
  return <PortableText value={content} components={components} />;
};

export default PopcornPortableText;
