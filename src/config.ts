import { NavigateFunction } from "react-router-dom";

export const navOptionsFactory = (navigate: NavigateFunction) => [
  {
    label: "Portfolio",
    long_label: "My Work",
    action: () => navigate("/portfolio"),
    icon: "portfolio",
  },
  {
    label: "Connect",
    long_label: "Let's Connect",
    action: () => navigate("/connect"),
    icon: "contact",
  },
];
