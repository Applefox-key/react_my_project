import Profile from "../components/users/Profile/Profile";

import About from "../components/AboutPage/About";
import MainPage from "../components/AboutPage/MainPage";
import ForgotPassword from "../components/users/Login/ForgotPassword";
import Training from "../components/expressions/Training/Training";
import ExpressionsListMain from "../components/expressions/ExpressionsList/ExpressionsListMain";

export const publicRoutes = [
  { path: "/login/:email", element: <MainPage />, nameNav: "" },
  { path: "/*", element: <MainPage />, nameNav: "" },
  {
    path: "/resetpassword/:resetToken",
    element: <ForgotPassword />,
    nameNav: "",
  },
];

export const privateRoutes = [
  { path: "/about", element: <About />, nameNav: "" },
  { path: "/training", element: <Training />, nameNav: "Training" },
  {
    path: "/training/:labelid/:labelName",
    element: <Training />,
    nameNav: "",
  },

  {
    path: "/expressions",
    element: <ExpressionsListMain />,
    nameNav: "expressions",
  },
  { path: "/*", element: <Training />, nameNav: "" },

  {
    path: "/profile",
    element: <Profile />,
    nameNav: "",
  },
];
