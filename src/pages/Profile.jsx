import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BaseAPI from "../API/BaseAPI";
import UserProfile from "../components/UserProfile";

const Profile = () => {
  const [ud, setUd] = useState();

  useEffect(() => {
    let us = BaseAPI.getUser();
    setUd(us);
  }, []);

  const updateUser = (data) => {
    BaseAPI.updateUser(data);
  };

  return (
    <div>
      <UserProfile userData={ud} btnName="Save changes" onClick={updateUser} />
    </div>
  );
};

export default Profile;
