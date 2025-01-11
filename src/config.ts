import { NavigateFunction } from "react-router-dom";

export const navOptionsFactory = (navigate: NavigateFunction) => [
  {
    label: "About",
    action: () => navigate("/about"),
    icon: "about",
  },
  {
    label: "Our Work",
    action: () => navigate("/portfolio"),
    icon: "portfolio",
  },
  {
    label: "Connect",
    action: () => navigate("/connect"),
    icon: "contact",
  },
];
