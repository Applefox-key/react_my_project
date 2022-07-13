import React from "react";
import MyInputGroup from "../UI/input/MyInputGroup";

const ProfileText = ({ userDataForm, setUserDataForm }) => {
  return (
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
  );
};

export default ProfileText;
