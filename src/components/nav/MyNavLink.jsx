import React from "react";
import { NavLink } from "react-router-dom";
import cl from "./MyNavbar.module.scss";
import CountBadge from "./CountBadge";
const MyNavLink = ({ root, i }) => {
  const isBadge =
    !window.location.pathname.includes(root.path) &&
    root.nameNav === "Training";
  return (
    <NavLink
      to={root.path}
      className={({ isActive }) => (isActive ? cl.navLinkActive : cl.navLink)}>
      {root.nameNav} {isBadge && <CountBadge />}
    </NavLink>
  );
};

export default MyNavLink;
