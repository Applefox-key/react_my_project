/* eslint-disable no-unused-vars */
import React from "react";
import BaseAPI from "../../../API/BaseAPI";
import Image from "react-bootstrap/Image";
import { useState, useEffect } from "react";
import { useQuery } from "../../../hooks/useQuery";
import MySpinner from "../../UI/MySpinner/MySpinner";
import imgProfile from "../../../img/profile.ico";
import { useNavigate } from "react-router-dom";
import { getAvatar } from "../../../utils/imagesSrv";
import cl from "./users.module.scss";
import { Dropdown } from "react-bootstrap";

const UserAvatar = (props) => {
  const [av, setAv] = useState();
  const [getData, isLoading] = useQuery(async () => {
    let userData = await BaseAPI.getUser();
    if (userData) setAv(userData.img ? userData.img : imgProfile);
  });
  const { isNav, logout, ...restP } = props;
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();

  return isLoading ? (
    <MySpinner />
  ) : isNav ? (
    <div>
      <Dropdown>
        <Dropdown.Toggle>
          <Image
            rounded
            onClick={(e) => {
              e.stopPropagation();
              navigate("/profile");
            }}
            src={getAvatar(av)}
            className={cl.navAv}
            {...restP}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu className="profile-menu" placement="top-start">
          <Dropdown.Item onClick={() => navigate("/profile")}>
            Profile
          </Dropdown.Item>
          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ) : (
    <Image
      rounded
      src={getAvatar(av)}
      style={{ width: "8%", height: "8%" }}
      {...restP}
    />
  );
};

export default UserAvatar;
