import cx from "classnames";
import {
  AnimatePresence,
  motion,
  useAnimate,
  usePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
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

const Page = () => {
  const { pathname } = useLocation();
  // const [didEnter, setDidEnter] = useState(false);
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (isPresent) {
      console.log(`RUNNING ENTRY ANIMATION FOR ${pathname}`);
      const entryAnimation = async () => {
        await animate(scope.current, { opacity: 1 }, { duration: 2 });
      };
      entryAnimation();
    } else {
      console.log(`RUNNING EXIT ANIMATION FOR ${pathname}`);
      const exitAnimation = async () => {
        await animate(scope.current, { opacity: 0 }, { duration: 1 });
        safeToRemove();
      };
      exitAnimation();
    }
  }, [isPresent, pathname]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      ref={scope}
      // key={`${pathname.replace("/", "")}`}
    >
      <Header isHomePage={false} />
      <div>THIS IS THE STUB IN PLACE OF PAGE CONTENTS!!!</div>
      {/* EVENTUALY I WILL PUT THIS BACK TO THE "OUTLET" TO RENDER THE ACTUAL CONTENTS, BUT I NEED A SIMPLER EXAMPLE FOR NOW */}
      {/* <Outlet /> */}
    </motion.div>
  );
};

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Page key={`page_${pathname.replace("/", "")}`} />
    </AnimatePresence>
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
