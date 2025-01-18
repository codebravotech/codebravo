import Connect from "./pages/Connect";
import Expertise from "./pages/Expertise";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";

export default [
  { index: true, path: "/", element: <Home /> },
  { path: "/expertise", element: <Expertise /> },
  { path: "/portfolio", element: <Portfolio /> },
  { path: "/connect", element: <Connect /> },
];
