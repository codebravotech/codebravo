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
}: {
  content: PortableTextBlock[];
}) {
  return (
    <PortableText
      value={content}
      components={merge(BaseComponents, components)}
    />
  );
}
