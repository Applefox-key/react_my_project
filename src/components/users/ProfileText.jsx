import React from "react";
import MyInputGroup from "../UI/input/MyInputGroup";

const ProfileText = ({ userDataForm, setUserDataForm }) => {
  return (
    <div>
      <h1 className="display-2">Your data</h1>
      <MyInputGroup
        required
        size="lg"
        label="Name"
        placeholder="Name"
        value={userDataForm.name}
        onChange={(e) =>
          setUserDataForm({ ...userDataForm, name: e.target.value })
        }
      ></MyInputGroup>
      <MyInputGroup
        size="lg"
        required
        label="email"
        type="email"
        placeholder="name@example.com"
        value={userDataForm.email}
        onChange={(e) =>
          setUserDataForm({ ...userDataForm, email: e.target.value })
        }
      ></MyInputGroup>
      <MyInputGroup
        required
        size="lg"
        label="password"
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
