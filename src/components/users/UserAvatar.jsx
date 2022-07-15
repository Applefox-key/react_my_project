import React from "react";
import BaseAPI from "../../API/BaseAPI";
import Image from "react-bootstrap/Image";
import { useState, useEffect } from "react";
import { useQuery } from "../../hooks/useQuery";
import MySpinner from "../UI/MySpinner";

const UserAvatar = () => {
  const [av, setAv] = useState();
  const [getData, isLoading, error] = useQuery(async () => {
    let userData = await BaseAPI.getUser();
    setAv(userData.imgu);
  });

  useEffect(() => {
    getData();
  }, []);

  return isLoading ? (
    <MySpinner />
  ) : (
    <Image rounded src={av} style={{ width: "5%", height: "5%" }} />
  );
};

export default UserAvatar;
