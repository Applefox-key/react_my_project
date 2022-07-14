import CollectionEdit from "../components/collections/CollectionEdit";
import About from "../pages/About";
import Login from "../pages/Login";
import UserCollections from "../pages/UserCollections";
import Training from "../pages/Training";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";

export const publicRoutes = [
  { path: "/about", element: <About />, nameNav: "About" },
  { path: "/login", element: <Login />, nameNav: "Login" },
  { path: "/signup", element: <SignUp />, nameNav: "" },
  { path: "/*", element: <About />, nameNav: "" },
];
export const privateRoutes = [
  { path: "/about", element: <About />, nameNav: "About" },
  { path: "/training", element: <Training />, nameNav: "Training" },
  {
    path: "/collections",
    element: <UserCollections />,
    nameNav: "Your collections",
  },
  { path: "/profile", element: <Profile />, nameNav: "Profile" },
  { path: "/collections/:id/:name", element: <CollectionEdit /> },
  { path: "/*", element: <UserCollections />, nameNav: "" },
];
