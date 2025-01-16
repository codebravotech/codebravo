import { PortableTextComponents } from "@portabletext/react";

export const BaseComponents: PortableTextComponents = {
  listItem: {
    bullet: ({ children }) => (
      <li className="my-1.5 ml-8 list-disc">{children}</li>
    ),
    number: ({ children }) => (
      <li className="my-2 ml-8 list-decimal">{children}</li>
    ),
  },
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
