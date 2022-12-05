import About from "../components/About";
import Login from "../components/users/Login";
import Training from "../components/expressions/Training";
import SignUp from "../components/users/SignUp";
import Profile from "../components/users/Profile";

import ExpressionsList from "../components/expressions/ExpressionsList";

import AdminPage from "../components/admin/AdminPage";
import AdminPbCollection from "../components/admin/AdminPbCollection";
import CategoriesManager from "../components/CategorySelection/CategoriesManager";

export const publicRoutes = [
  { path: "/about", element: <About />, nameNav: "About" },
  { path: "/login", element: <Login />, nameNav: "Login" },
  { path: "/login/:email", element: <Login />, nameNav: "" },
  { path: "/signup", element: <SignUp />, nameNav: "" },
  { path: "/*", element: <About />, nameNav: "" },
];
export const adminRoutes = [
  { path: "/main", element: <AdminPage />, nameNav: "Main" },
  { path: "/admin/pub", element: <AdminPbCollection />, nameNav: "Public" },
  { path: "/*", element: <AdminPage />, nameNav: "" },
];
export const privateRoutes = [
  { path: "/about", element: <About />, nameNav: "About" },
  { path: "/training", element: <Training />, nameNav: "Training" },
  {
    path: "/expressions",
    element: <ExpressionsList />,
    nameNav: "Expressions",
  },
  { path: "/*", element: <Training />, nameNav: "" },

  { path: "/profile", element: <Profile />, nameNav: "Profile" },
  { path: "/categories", element: <CategoriesManager />, nameNav: "" },
];
