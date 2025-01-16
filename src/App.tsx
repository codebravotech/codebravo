import cx from "classnames";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { Tooltip } from "react-tooltip";

import Footer from "./components/Footer";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import { useDisplay } from "./hooks/display";
import About from "./pages/About";
import Connect from "./pages/Connect";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";

// Layout component with Header
const Layout = () => {
  const { pathname } = useLocation();
  const { isMobile } = useDisplay();
  const isHomePage = pathname === "/";
  const tooltipClassname =
    "mt-2 z-50 rounded-xl bg-opacity-50 px-2 py-1 font-raleway text-xs bg-night-100 text-stars-100";

  return (
    <div className="relative flex min-h-screen w-[100vw] flex-col overflow-x-hidden overflow-y-scroll bg-stars-100 scrollbar-hide">
      <Header isHomePage={isHomePage} />

      <Outlet />

      <div className={cx("mt-auto", isMobile && !isHomePage && "mb-32")}>
        <Footer isHomePage={isHomePage} />
      </div>

      {isMobile && <MobileMenu isHomePage={isHomePage} />}

      <Tooltip
        id="mailto_link_tooltip"
        arrowColor="transparent"
        className={cx(tooltipClassname)}
        disableStyleInjection={true}
      />
      <Tooltip
        id="copy_email_tooltip"
        arrowColor="transparent"
        className={cx(tooltipClassname)}
        disableStyleInjection={true}
      />
      <Tooltip
        id="visit_special_links_tooltip"
        arrowColor="transparent"
        className={cx(tooltipClassname)}
        disableStyleInjection={true}
      />
    </div>
  );
};

// Routes array
const ROUTES = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/portfolio", element: <Portfolio /> },
      { path: "/connect", element: <Connect /> },
    ],
    errorElement: <NotFound />,
  },
];

const router = createBrowserRouter(ROUTES);

const App = () => <RouterProvider router={router} />;

export default App;
