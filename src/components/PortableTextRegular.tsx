import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";

const components: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      if (!value) {
        return;
      }
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          className="link-highlight z-10 inline-block px-1"
          href={value.href}
          rel={rel}
          target="_blank"
        >
          {children}
        </a>
      );
    },
  },
};

const PortableTextRegular = ({ content }: { content: PortableTextBlock[] }) => {
  return <PortableText value={content} components={components} />;
};

export default PortableTextRegular;
