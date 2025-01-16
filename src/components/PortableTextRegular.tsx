import { PortableText, PortableTextBlock } from "@portabletext/react";

import { BaseComponents } from "./PortableTextBaseComponents";

export default function PortableTextRegular({
  content,
}: {
  content: PortableTextBlock[];
}) {
  return <PortableText value={content} components={BaseComponents} />;
}
