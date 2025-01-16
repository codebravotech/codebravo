import { NavOptions } from "./types/components";

export const IMAGE_SCALE_FACTOR = 0.8;

export const WEB3_FORMS_KEY = "3ce49e39-9247-40cf-8c33-5850a9d32664";

export const NAV_OPTIONS: Array<NavOptions> = [
  {
    label: "Home",
    pathname: "/",
    icon: "home",
    short_label: "Home",
  },
  {
    label: "My Work",
    pathname: "/portfolio",
    icon: "portfolio",
    short_label: "Work",
  },
  {
    label: "My Skills",
    pathname: "/about",
    icon: "about",
    short_label: "Skills",
  },
  {
    label: "Connect",
    pathname: "/connect",
    icon: "connect",
    short_label: "Connect",
  },
];
