import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BaseAPI from "../../API/BaseAPI";
import { AuthContext } from "../../context";
import { privateRoutes, publicRoutes } from "../../router/routes";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import MyNavLink from "./MyNavLink";
import imgFav from "../../img/favicon3.ico";
import cl from "./MyNavbar.module.css";

const MyNavbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const router = useNavigate();

  const logout = () => {
    BaseAPI.logout();
    setIsAuth(false);
    router("/login");
  };

  //get  elements with nameNav only
  const routesArr = (isAuth ? privateRoutes : publicRoutes).filter(
    (rout) => rout.nameNav
  );

  return (
    <div className={[cl.nav, "bg-light"].join(" ")}>
      <Nav activeKey="/about" className="justify-content-end">
        {/* <img src={imgFav} className={cl.navbarico} /> */}
        {routesArr.map((item, i) => (
          <Nav.Item key={i}>
            <MyNavLink root={item} />
          </Nav.Item>
        ))}

        {isAuth && (
          <Button variant="outline-dark" className="mx-2" onClick={logout}>
            Logout
          </Button>
        )}
      </Nav>
    </div>
  );
};

export default MyNavbar;
