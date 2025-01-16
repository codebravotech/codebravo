import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";

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
  return (
    <div className="h-full w-full bg-stars-100">
      <Header isHomePage={isHomePage} />
      <div className="min-h-[82%] w-[100vw] overflow-x-hidden overflow-y-scroll bg-stars-100 scrollbar-hide">
        <Outlet />
      </div>
      {isMobile && <MobileMenu />}
      <Footer isHomePage={isHomePage} />
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
