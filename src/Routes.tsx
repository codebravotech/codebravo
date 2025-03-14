import { Navigate } from "react-router-dom";

import Connect from "./pages/Connect";
import Expertise from "./pages/Expertise";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Project from "./pages/Project";

export default [
  { index: true, path: "/", element: <Portfolio /> },
  { path: "/project/:project_id", element: <Project /> },
  { path: "/expertise", element: <Expertise /> },
  { path: "/portfolio", element: <Navigate to={"/"} replace /> },
  { path: "/connect", element: <Connect /> },
  { index: true, path: "/home", element: <Home /> },
];
