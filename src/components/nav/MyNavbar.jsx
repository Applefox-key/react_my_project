import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BaseAPI from "../../API/BaseAPI";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import MyNavLink from "./MyNavLink";
import cl from "./MyNavbar.module.scss";
import { useAuth } from "../../hooks/useAuth";
import UserAvatar from "../users/Profile/UserAvatar";
import { RiLogoutCircleRLine } from "react-icons/ri";

const MyNavbar = () => {
  const router = useNavigate();
  //get  elements with nameNav only

  const [routesArr, userAuth, setUserAuth] = useAuth(true);

  const logout = () => {
    BaseAPI.logout();
    setUserAuth({ isAuth: false, role: null });
    router("/login");
  };

  const isHideNav = window.location.pathname.includes("/training");
  return (
    <div className={[cl.nav, "bg-light"].join(" ")}>
      <Nav activeKey="/about" className={cl["nav-top-string"]} size="lg">
        {!isHideNav && (
          <>
            <div className={cl.headerLogo}>
              <Link to="/about">{<h1>LearnFast </h1>}</Link>
            </div>
            {/* <div className={cl.subN}> */}
            {routesArr
              .filter((el) => el.nameNav)
              .map((item, i) => (
                <Nav.Item key={i}>
                  <MyNavLink root={item} />
                </Nav.Item>
              ))}
            {userAuth.isAuth && (
              <div>
                <UserAvatar isNav />
                <Button
                  variant="outline-dark"
                  size="lg"
                  onClick={logout}
                  title="Logout">
                  <RiLogoutCircleRLine />
                </Button>{" "}
              </div>
            )}
            {/* </div> */}
          </>
        )}
      </Nav>
    </div>
  );
};

export default MyNavbar;
