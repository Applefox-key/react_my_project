import React from "react";
import BaseAPI from "../../API/BaseAPI";
import Image from "react-bootstrap/Image";
import { useState, useEffect } from "react";

const UserAvatar = () => {
  const [av, setAv] = useState();

  useEffect(() => {
    let ud = BaseAPI.getUser();
    setAv(ud.imgu);
  });

  return (
    <div>
      <Image rounded src={av} style={{ width: "100px" }} />
    </div>
  );
};

export default UserAvatar;
