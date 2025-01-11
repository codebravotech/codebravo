import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Portfolio from "./pages/Portfolio";
import Connect from "./pages/Connect";

// Layout component with Header
const Layout = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  return (
    <>
      <Header isHomePage={isHomePage} />
      <Outlet />
    </>
  );
};

// Routes array
const ROUTES = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/portfolio", element: <Portfolio /> },
      { path: "/connect", element: <Connect /> },
    ],
    errorElement: <NotFound />,
  },
];

const router = createBrowserRouter(ROUTES);

const App = () => <RouterProvider router={router} />;

export default App;
