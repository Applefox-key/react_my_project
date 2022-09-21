/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import BaseAPI from "../API/BaseAPI";
import UserProfile from "../components/users/UserProfile";
import MySpinner from "../components/UI/MySpinner";
import { useQuery } from "../hooks/useQuery";
import { PopupContext } from "../context";

const Profile = () => {
  const [userData, setUserData] = useState();
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const [getUserData, isLoading, error] = useQuery(async () => {
    const data = await BaseAPI.getUser();
    setUserData(data);
  });

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="mt-4">
      {isLoading ? (
        <MySpinner />
      ) : (
        <UserProfile
          userData={userData}
          btnName="Save changes"
          onClick={updateUser}
        />
      )}
    </div>
  );
};

export default Profile;
