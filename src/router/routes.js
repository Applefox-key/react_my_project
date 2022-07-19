import CollectionEdit from "../components/collections/oneCollection/CollectionEdit";
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
import OneCard from "../components/collections/OneCard";
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
  { path: "/profile", element: <Profile />, nameNav: "Profile" },

  { path: "/collections", element: <Collections />, nameNav: "Extra" },

  { path: "/collections/:id/:name", element: <CollectionEdit /> },
  { path: "/collections/:id/:name/:item", element: <OneCard /> },
  { path: "/collections/play/:id/:name", element: <CardsGallery /> },
  { path: "/public/:id/:name", element: <PublicCollectionsView /> },
  // {
  //   path: "/public",
  //   element: <PublicCollections />,
  //   nameNav: "Public collections",
  // },
];
