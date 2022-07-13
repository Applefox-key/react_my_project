import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BaseAPI from "../API/BaseAPI";
import UserProfile from "../components/users/UserProfile";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import MySpinner from "../components/UI/MySpinner";
import { useQuery } from "../hooks/useQuery";
import MyToast from "../components/UI/toast/MyToast";

const Profile = () => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [userData, setUserData] = useState();
  const toastProps = {
    message: "The changes have been saved",
    smalltext: "user data",
    header: "SUCCESS!!!",
    bg: "info",
    autohide: true,
  };
  const router = useNavigate();
  const [getUserData, isLoading, error] = useQuery(async () => {
    console.log("effect DB UnreadWords");
    const data = await BaseAPI.getUser();
    setUserData(data);
  });

  useEffect(() => {
    getUserData();
  }, []);

  const updateUser = (data) => {
    let result = BaseAPI.updateUser(data);
    // router = "/collections";
    result.then((res) => {
      setShow(result);
    });
  };

  return (
    <div ref={target}>
      <MyToast show={show} setShow={setShow} {...toastProps} />
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
// {alert && (
//   <div className="d-flex justify-content-center">
//     <MyAlert show={show} setShow={setShow} {...alertProps} />
//   </div>
// )}
export default Profile;
// {show && (
//         <div className="d-flex justify-content-center">
//           <MyToast show={show} setShow={setShow} {...toastProps} />
//         </div>
//       )}
