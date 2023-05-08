import React from "react";
import { NavLink } from "react-router-dom";
import cl from "./MyNavbar.module.scss";
const MyNavLink = ({ root, i }) => {
  return (
    <NavLink
      to={root.path}
      className={({ isActive }) => (isActive ? cl.navLinkActive : cl.navLink)}>
      {root.nameNav}
    </NavLink>
  );
};

export default MyNavLink;
