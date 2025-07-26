import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BaseAPI from "../../API/BaseAPI";
import { useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import MyNavLink from "./MyNavLink";
import cl from "./MyNavbar.module.scss";
import { useAuth } from "../../hooks/useAuth";
import UserAvatar from "../users/Profile/UserAvatar";

const MyNavbar = () => {
  const router = useNavigate();
  //get  elements with nameNav only
  const location = useLocation();
  const [routesArr, userAuth, setUserAuth] = useAuth(true);

  const isHideNav = location.pathname.includes("/training");
  const logout = () => {
    BaseAPI.logout();
    setUserAuth({ isAuth: false, role: null });
    router("/login");
  };
  return (
    <div className={[cl.nav, "bg-light"].join(" ")}>
      {!isHideNav && (
        <Nav activeKey="/about" className={cl["nav-top-string"]} size="lg">
          <>
            <div className={cl.headerLogo}>
              <Link to="/about">{<h1>LearnFast </h1>}</Link>
            </div>

            {routesArr
              .filter((el) => el.nameNav)
              .map((item, i) => (
                <Nav.Item key={i}>
                  <MyNavLink root={item} />
                </Nav.Item>
              ))}
            {userAuth.isAuth && (
              <>
                <UserAvatar isNav logout={logout} />
              </>
            )}
          </>
        </Nav>
      )}
    </div>
  );
};

export default MyNavbar;
