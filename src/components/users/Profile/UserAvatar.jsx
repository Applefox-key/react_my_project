/* eslint-disable no-unused-vars */
import React from "react";
import BaseAPI from "../../../API/BaseAPI";
import Image from "react-bootstrap/Image";
import { useState, useEffect } from "react";
import { useQuery } from "../../../hooks/useQuery";
import MySpinner from "../../UI/MySpinner/MySpinner";
import imgProfile from "../../../img/profile.ico";
import { useNavigate } from "react-router-dom";

const UserAvatar = (props) => {
  const [av, setAv] = useState();
  const [getData, isLoading] = useQuery(async () => {
    let userData = await BaseAPI.getUser();
    if (userData) setAv(userData.img ? userData.img : imgProfile);
  });
  const { isNav, ...restP } = props;
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const route = useNavigate();

  return isLoading ? (
    <MySpinner />
  ) : isNav ? (
    <Image
      rounded
      onClick={() => route("/profile")}
      src={av}
      style={{ width: "30px", height: "30px" }}
      {...restP}
    />
  ) : (
    <Image rounded src={av} style={{ width: "8%", height: "8%" }} {...restP} />
  );
};

export default UserAvatar;
