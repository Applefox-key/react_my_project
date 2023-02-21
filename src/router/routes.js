import Login from "../components/users/Login";
import Training from "../components/expressions/Training";
import Profile from "../components/users/Profile";

import ExpressionsList from "../components/expressions/ExpressionsList";

import CategoriesManager from "../components/CategorySelection/CategoriesManager";

export const publicRoutes = [
  // { path: "/login", element: <Login />, nameNav: "Login" },
  { path: "/login/:email", element: <Login />, nameNav: "" },
  { path: "/*", element: <Login />, nameNav: "" },
];

export const privateRoutes = [
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
