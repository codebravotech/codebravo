export type ValidRoutes = "/about" | "/connect" | "/" | "/portfolio";
export type IconType = "about" | "connect" | "home" | "portfolio";
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
