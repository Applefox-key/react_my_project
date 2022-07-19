import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import BaseAPI from "../API/BaseAPI";
import UserProfile from "../components/users/UserProfile";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import MySpinner from "../components/UI/MySpinner";
import { useQuery } from "../hooks/useQuery";
import { PopupContext } from "../context";

const Profile = () => {
  const target = useRef(null);
  const [userData, setUserData] = useState();
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const router = useNavigate();
  const [getUserData, isLoading, error] = useQuery(async () => {
    console.log("effect DB UnreadExpressions");
    const data = await BaseAPI.getUser();
    setUserData(data);
  });

  useEffect(() => {
    getUserData();
  }, []);

  const updateUser = (data) => {
    let result = BaseAPI.updateUser(data);
    result.then((res) => {
      const popup = res
        ? [true, "The changes have been saved", "success"]
        : [true, "Somethig goes wrong.." + error, "error"];
      setPopupSettings(popup);
    });
  };

  return (
    <>
      {isLoading ? (
        <MySpinner />
      ) : (
        <UserProfile
          userData={userData}
          btnName="Save changes"
          onClick={updateUser}
        />
      )}
    </>
  );
};

export default Profile;
