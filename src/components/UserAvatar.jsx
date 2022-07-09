import React from "react";
import BaseAPI from "../API/BaseAPI";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import { useEffect } from "react";

const UserAvatar = () => {
  const [av, setAv] = useState();
  useEffect(() => {
    let ud = BaseAPI.getUser();
    console.log(ud);

    setAv(ud.imgu);
  });

  return (
    <div>
      <Image rounded src={av} style={{ width: "100px" }} />
    </div>
  );
};

export default UserAvatar;
