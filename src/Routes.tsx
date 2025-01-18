import About from "./pages/About";
import Connect from "./pages/Connect";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";

export default [
  { index: true, path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/portfolio", element: <Portfolio /> },
  { path: "/connect", element: <Connect /> },
];
