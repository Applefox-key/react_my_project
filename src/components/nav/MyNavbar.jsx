import React, { useContext } from "react";
import BaseAPI from "../../API/BaseAPI";
import { AuthContext } from "../../context";
import { privateRoutes, publicRoutes } from "../../router/routes";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/esm/Container";
import MyNavLink from "./MyNavLink";

const MyNavbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = () => {
    BaseAPI.logout();
    setIsAuth(false);
  };

  //get  elements with nameNav only
  const routesArr = (isAuth ? privateRoutes : publicRoutes).filter(
    (rout) => rout.nameNav
  );
  //navbar bg-light justify-content-end position-fixed top-0 end-0
  return (
    <div
      className="position-fixed top-0 end-0 start-0 bg-light justify-content-end"
      style={{ zIndex: "500" }}
    >
      <Nav activeKey="/about" className="justify-content-end">
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
