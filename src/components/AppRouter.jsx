import React from "react";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext, PopupContext } from "../context";
import MyNavbar from "./nav/MyNavbar";
import { privateRoutes, publicRoutes } from "../router/routes";
import Popup from "./UI/popup/Popup";

const AppRouter = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const routesArr = isAuth ? privateRoutes : publicRoutes;
  return (
    <div>
      <MyNavbar />
      <div style={{ marginTop: "2.5rem" }} />
      <Popup />

      <div className="main_page">
        <Routes>
          {routesArr.map((item, i) => (
            <Route path={item.path} element={item.element} key={i} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default AppRouter;
