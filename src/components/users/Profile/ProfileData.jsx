import React, { useState } from "react";

import cl from "../Login/login.module.scss";
const ProfileData = ({ userDataForm, setUserDataForm, onClick }) => {
  const [err, setErr] = useState("");
  return (
    <div>
      <div className={cl.login_block}>
        <h1 className={cl.h1login}>YOU DATA</h1>
        <p className={cl.lblInput}>email</p>
        <input
          className={cl.inputlogin}
          type="text"
          value={userDataForm.email}
          placeholder="Username"
          id="username"
          onChange={(e) => {
            if (err) setErr("");
            setUserDataForm({ ...userDataForm, email: e.target.value });
          }}
        />{" "}
        <p className={cl.lblInput}>name</p>
        <input
          className={cl.inputlogin}
          type="string"
          value={userDataForm.name}
          placeholder="Name"
          id="name"
          onChange={(e) => {
            if (err) setErr("");
            setUserDataForm({ ...userDataForm, name: e.target.value });
          }}
        />
        <p className={cl.lblInput}>password</p>
        <input
          className={cl.inputlogin}
          type="password"
          value={userDataForm.password}
          placeholder="Password"
          id="password"
          onChange={(e) => {
            if (err) setErr("");
            setUserDataForm({ ...userDataForm, password: e.target.value });
          }}
        />{" "}
        <button className={cl.logbutton} type="submit">
          Save changes
        </button>
      </div>
    </div>
  );
};

export default ProfileData;
