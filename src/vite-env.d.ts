/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.svg?react" {
  import React from "react";
  const Component: React.FC<React.SVGProps<SVGSVGElement>>;
  export default Component;
}
