import React, { useState, useEffect } from "react";
import MyInputGroup from "../UI/input/MyInputGroup";
import AvatarsList from "../AvatarsList";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/Image";
import imgProfile from "../../img/profile.ico";
import Form from "react-bootstrap/Form";

const UserProfile = ({ userData, onClick, btnName }) => {
  const [userDataForm, setUserDataForm] = useState({
    name: "",
    email: "",
    imgu: imgProfile,
    password: "",
  });

  useEffect(() => {
    if (!userData) return;
    setUserDataForm({ ...userData });
  }, [userData]);

  const changeAvatar = async (url) => {
    console.log(userDataForm);
    setUserDataForm({ ...userDataForm, imgu: url });
    console.log(userDataForm);
  };

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        onClick(userDataForm);
      }}
    >
      <div className="d-flex justify-content-center mt-2 px-5">
        <div className="mx-2">
          <Image rounded src={userDataForm.imgu} style={{ width: "250px" }} />
          <AvatarsList onChange={changeAvatar} />
        </div>

        <div style={{ width: "80%" }}>
          <h1 className="display-2">Your data</h1>
          <MyInputGroup
            required
            text="Name"
            placeholder="Name"
            value={userDataForm.name}
            onChange={(e) =>
              setUserDataForm({ ...userDataForm, name: e.target.value })
            }
          ></MyInputGroup>
          <MyInputGroup
            required
            text="email"
            type="email"
            placeholder="name@example.com"
            value={userDataForm.email}
            onChange={(e) =>
              setUserDataForm({ ...userDataForm, email: e.target.value })
            }
          ></MyInputGroup>
          <MyInputGroup
            required
            text="password"
            type="password"
            placeholder="password"
            value={userDataForm.password}
            onChange={(e) =>
              setUserDataForm({ ...userDataForm, password: e.target.value })
            }
          ></MyInputGroup>
        </div>
        <Button as="input" type="submit" value={btnName} />
      </div>
    </Form>
  );
};

export default UserProfile;
