import cx from "classnames";
import {
  AnimatePresence,
  motion,
  useAnimate,
  usePresence,
} from "framer-motion";
import { ReactNode, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import Footer from "./components/Footer";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import { ROUTES } from "./config";
import { useDisplay } from "./hooks/display";

const Page = ({ children: pageContents }: { children: ReactNode }) => {
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();
  const { pathname } = useLocation();
  const { isMobile } = useDisplay();
  const isHomePage = pathname === "/";

  const tooltipClassname =
    "mt-2 z-50 rounded-xl bg-opacity-50 px-2 py-1 font-raleway text-xs bg-night-100 text-stars-100";

  useEffect(() => {
    if (isPresent) {
      const entryAnimation = async () => {
        await animate(scope.current, { opacity: 1 }, { duration: 1 });
      };
      entryAnimation();
    } else if (!isPresent && safeToRemove) {
      const exitAnimation = async () => {
        await animate(scope.current, { opacity: 0 }, { duration: 1 });
        safeToRemove();
      };
      exitAnimation();
    }
  }, [isPresent]);

  return (
    <motion.div
      ref={scope}
      initial={{ opacity: 0 }}
      className="relative flex min-h-screen w-[100vw] flex-col overflow-x-hidden overflow-y-scroll bg-stars-100 scrollbar-hide"
    >
      <Header isHomePage={isHomePage} />
      {pageContents}

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
    </motion.div>
  );
};

const AnimationWrapper = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {ROUTES.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<Page>{route.element()}</Page>}
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AnimationWrapper />
    </BrowserRouter>
  );
};

export default App;
