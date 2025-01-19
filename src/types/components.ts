import { Project } from "./sanity.types";

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

export interface NavOptions {
  label: string;
  pathname: ValidRoutes;
  icon: IconType;
  short_label: string;
}

export interface ProjectObject extends Project {
  thumbnailAsset: { url: string };
  thumbnailAlt: string;
}
