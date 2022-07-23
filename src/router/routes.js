import OneCollection from "../components/collections/OneCollection";
import About from "../pages/About";
import Login from "../pages/Login";
import Collections from "../pages/Collections";
import Training from "../pages/Training";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import PublicCollections from "../components/collections/public/PublicCollections";
import PublicCollectionsView from "../components/collections/public/PublicCollectionView";
import ExpressionsList from "../pages/ExpressionsList";
import CardsGallery from "../components/collections/games/CardsGallery";
import ContentCardInfo from "../components/collections/ContentCardInfo";
import Pairs from "../components/collections/games/Pairs";
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
    path: "/expressions",
    element: <ExpressionsList />,
    nameNav: "Expressions",
  },
  { path: "/*", element: <Training />, nameNav: "" },

  { path: "/collections", element: <Collections />, nameNav: "Extra" },
  { path: "/profile", element: <Profile />, nameNav: "Profile" },

  { path: "/collections/:id/:name", element: <OneCollection /> },
  { path: "/collections/:id/:name/:item", element: <ContentCardInfo /> },
  { path: "/collections/play/:id/:name", element: <CardsGallery /> },
  { path: "/collections/play_pairs/:id/:name", element: <Pairs /> },
  { path: "/public/:id/:name", element: <PublicCollectionsView /> },
  // {
  //   path: "/public",
  //   element: <PublicCollections />,
  //   nameNav: "Public collections",
  // },
];
