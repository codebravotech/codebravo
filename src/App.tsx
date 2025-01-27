import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import {
  BrowserRouter,
  Route,
  RouteObject,
  Routes,
  useLocation,
} from "react-router-dom";
import { Tooltip } from "react-tooltip";

import ROUTES from "./Routes";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import MobileMenu from "./components/MobileMenu";
import { useToken } from "./hooks/api";
import { useDisplay } from "./hooks/display";
import NotFound from "./pages/NotFound";
import { useSystemStore } from "./state/system";

const Page = ({ children: pageContents }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const { isMobile, isPortrait } = useDisplay();
  const { animationPhase } = useSystemStore();
  const isHomePage = pathname === "/home";
  const isPortfolio = pathname === "/portfolio" || pathname === "/";

  const tooltipClassname =
    "mt-2 z-50 rounded-xl bg-opacity-50 px-2 py-1 font-raleway text-xs bg-night-100 text-stars-100";

  return (
    <div>
      <motion.div
        initial={{
          opacity: 0,
          x: isHomePage || isPortrait ? 0 : 50,
          y: isHomePage || !isPortrait ? 0 : -50,
        }}
        animate={{
          x: 0,
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.6,
          },
        }}
        exit={{
          x: isHomePage || isPortrait ? 0 : -50,
          y: isHomePage || !isPortrait ? 0 : 50,
          opacity: 0,
          transition: {
            duration: 0.3,
          },
        }}
        layoutScroll
        style={
          animationPhase === "MODAL_CLOSED"
            ? { overflowY: "scroll" }
            : { overflowY: "hidden" }
        }
        className={cx(
          "relative flex w-screen flex-col overflow-hidden scrollbar-hide",
          isPortfolio ? "bg-night-gradient text-stars-100" : "bg-stars-100",
        )}
      >
        {/* {isMobile && animationPhase === 'MODAL_CLOSED' && <MobileMenu isHomePage={isHomePage} />} */}

        <Header isHomePage={isHomePage} isPortfolio={isPortfolio} />
        {pageContents}
        <div
          id="footer_container"
          className={cx(isMobile && !isHomePage && "mb-32")}
        >
          <Footer />
        </div>
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
    </div>
  );
};

const AnimationWrapper = () => {
  const location = useLocation();
  useToken();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {ROUTES.map((route: RouteObject) => (
          <Route
            key={route.path}
            path={route.path}
            errorElement={<NotFound />}
            element={<Page>{route.element}</Page>}
          />
        ))}
        <Route path="*" element={<NotFound />} />
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
