import {
  Content_block,
  Project,
  SanityFileAsset,
  SanityImageAsset,
} from "./sanity.types";

export type ValidRoutes = "/expertise" | "/connect" | "/" | "/portfolio";
export type IconType =
  | "about"
  | "clipboard"
  | "connect"
  | "home"
  | "portfolio"
  | "refresh";
export type PostResult = "SUCCESS" | "ERROR" | null;
export type SanityQueryParams = Record<
  string,
  string | number | boolean | null | (string | number | boolean | null)[]
>;

export type Orientation = "landscape" | "portrait";

export interface NavOptions {
  label: string;
  pathname: ValidRoutes;
  icon: IconType;
  short_label: string;
}

export interface ResolvedVideoRef {
  asset: SanityFileAsset;
  orientation: Orientation;
}

export interface ResolvedImageRef {
  asset: SanityImageAsset;
  alt: string;
  orientation?: Orientation;
}

export interface ProjectObject
  extends Omit<Project, "thumbnails" | "videos" | "client_logo"> {
  thumbnails: ResolvedImageRef[];
  client_logo: ResolvedImageRef;
  videos: ResolvedVideoRef[];
}

export interface ContentObject extends Omit<Content_block, "image"> {
  _key: string;
  image: ResolvedImageRef;
}
