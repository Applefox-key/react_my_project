import React from "react";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../context";
import MyNavbar from "./nav/MyNavbar";
import { privateRoutes, publicRoutes } from "../router/routes";

const AppRouter = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  // console.log(isAuth);
  const routesArr = isAuth ? privateRoutes : publicRoutes;
  return (
    <div>
      <MyNavbar />
      <div style={{ marginTop: "5rem" }} />
      <Routes>
        {routesArr.map((item, i) => (
          <Route
            path={item.path}
            element={item.element}
            key={item.path + "n" + i}
          />
        ))}
      </Routes>
    </div>
  );
};

export default AppRouter;
