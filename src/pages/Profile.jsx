import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BaseAPI from "../API/BaseAPI";
import MyAlert from "../components/UI/MyAlert";
import UserProfile from "../components/users/UserProfile";
import { useRef } from "react";

const Profile = () => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [ud, setUd] = useState();
  const [showa, setShowa] = useState(false);
  const alertProps = {
    message: "The changes have been saved",
    variant: "success",
    btntext: "OK",
    header: "",
  };
  useEffect(() => {
    let us = BaseAPI.getUser();
    setUd(us);
  }, []);

  const updateUser = (data) => {
    let result = BaseAPI.updateUser(data);
    setShow(result);
  };

  return (
    <div ref={target}>
      <UserProfile userData={ud} btnName="Save changes" onClick={updateUser} />

      {alert && (
        <div className="d-flex justify-content-center">
          <MyAlert show={show} setShow={setShow} {...alertProps} />
        </div>
      )}
    </div>
  );
};

export default Profile;
