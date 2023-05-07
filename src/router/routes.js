import Training from "../components/expressions/Training";
import Profile from "../components/users/Profile/Profile";

import ExpressionsList from "../components/expressions/ExpressionsList";
import About from "../components/AboutPage/About";
import MainPage from "../components/AboutPage/MainPage";
import ForgotPassword from "../components/users/Login/ForgotPassword";

export const publicRoutes = [
  // { path: "/login", element: <Login />, nameNav: "Login" },
  { path: "/login/:email", element: <MainPage />, nameNav: "" },
  { path: "/*", element: <MainPage />, nameNav: "" },
  {
    path: "/resetpassword/:resetToken",
    element: <ForgotPassword />,
    nameNav: "",
  },
];

export const privateRoutes = [
  { path: "/about", element: <About />, nameNav: "About" },
  { path: "/training", element: <Training />, nameNav: "Training" },
  {
    path: "/training/:labelid/:labelName",
    element: <Training />,
    nameNav: "",
  },

  {
    path: "/expressions",
    element: <ExpressionsList />,
    nameNav: "Expressions",
  },
  { path: "/*", element: <Training />, nameNav: "" },

  { path: "/profile", element: <Profile />, nameNav: "Profile" },
];
