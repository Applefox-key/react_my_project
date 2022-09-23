import OneCollection from "../components/collections/OneCollection";
import About from "../pages/About";
import Login from "../pages/Login";
import Training from "../pages/Training";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import PublicCollections from "../components/collections/public/PublicCollections";
import PublicCollectionsView from "../components/collections/public/PublicCollectionView";
import ExpressionsList from "../pages/ExpressionsList";
import CardsGallery from "../components/collections/games/CardsGallery";
import ContentCardInfo from "../components/collections/ContentCardInfo";
import Pairs from "../components/collections/games/Pairs";
import Extra from "../pages/Extra";
import TestCard from "../components/collections/games/TestCard";
import TimeCard from "../components/collections/games/TimeCard";
import WriteCard from "../components/collections/games/WriteCard";
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

  { path: "/collections", element: <Extra />, nameNav: "Collections" },
  { path: "/profile", element: <Profile />, nameNav: "Profile" },

  { path: "/collections/my/:id/:name", element: <OneCollection /> },
  { path: "/collections/:tab", element: <Extra /> },
  { path: "/collections/pub/:id/:name", element: <PublicCollectionsView /> },
  { path: "/collections/my/:id/:name/:item", element: <ContentCardInfo /> },
  { path: "/play_cards/:tab/:mode/:id/:name", element: <CardsGallery /> },
  { path: "/play_timecard/:tab/:id/:name", element: <TimeCard /> },
  { path: "/play_test/:tab/:id/:name", element: <TestCard /> },
  { path: "/play_write/:tab/:id/:name", element: <WriteCard /> },
  { path: "/play_pairs/:tab/:id/:name", element: <Pairs /> },

  {
    path: "/public",
    element: <PublicCollections />,
    // nameNav: "Public collections",
  },
];
