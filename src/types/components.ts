export type ValidRoutes = "/about" | "/connect" | "/" | "/portfolio";
export type IconType = "about" | "connect" | "home" | "portfolio";

export interface NavOptions {
  label: string;
  pathname: ValidRoutes;
  icon: IconType;
}
