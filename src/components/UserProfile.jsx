import React from "react";
import MyInputGroup from "./UI/MyInputGroup";
import AvatarsList from "./AvatarsList";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { useEffect } from "react";
import Image from "react-bootstrap/Image";
import imgProfile from "../img/profile.ico";

const UserProfile = ({ userData, onClick, btnName }) => {
  const [userDataForm, setUserDataForm] = useState({
    name: "",
    email: "",
    imgu: imgProfile,
    password: "",
  });

  console.log("userDataForm");
  console.log(userDataForm);

  useEffect(() => {
    if (!userData) return;
    setUserDataForm({ ...userData });
  }, [userData]);
  const changeAvatar = (url) => {
    setUserDataForm({ ...userDataForm, imgu: url });
  };
  return (
    <div className="d-flex " style={{ width: "80%" }}>
      <div className="mx-2">
        <Image rounded src={userDataForm.imgu} style={{ width: "250px" }} />
        <AvatarsList onChange={changeAvatar} />
      </div>
      <div style={{ width: "80%" }}>
        <h1 className="display-2">Your data</h1>
        <MyInputGroup
          text="Name"
          placeholder="Name"
          value={userDataForm.name}
          onChange={(e) =>
            setUserDataForm({ ...userDataForm, name: e.target.value })
          }
        ></MyInputGroup>
        <MyInputGroup
          text="email"
          type="email"
          placeholder="email"
          value={userDataForm.email}
          onChange={(e) =>
            setUserDataForm({ ...userDataForm, email: e.target.value })
          }
        ></MyInputGroup>
        <MyInputGroup
          text="password"
          type="password"
          placeholder="password"
          value={userDataForm.password}
          onChange={(e) =>
            setUserDataForm({ ...userDataForm, password: e.target.value })
          }
        ></MyInputGroup>
      </div>
      <Button
        onClick={() => {
          onClick(userDataForm);
        }}
      >
        {btnName}
      </Button>
    </div>
  );
};

export default UserProfile;
