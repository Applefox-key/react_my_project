import React, { useState } from "react";
import clU from "./users.module.scss";
import cl from "../Login/login.module.scss";
const ProfileData = ({ userDataForm, setUserDataForm, onClick }) => {
  const [err, setErr] = useState("");
  return (
    <div className={clU["box-profile-set"]}>
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
          type="text"
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
        />
        <button className={cl.logbutton} type="submit">
          Save changes
        </button>
      </div>
      <div className={cl.login_block}>
        <h1 className={cl.h1login}>SETTINGS</h1>
        <p className={cl.lblInput}>daily Queue Limit</p>
        <input
          className={cl.inputlogin}
          type="number"
          value={userDataForm.settings.dailyQueueLimit}
          placeholder="dailyQueueLimit"
          id="dailyQueueLimit"
          onChange={(e) => {
            setUserDataForm((prev) => ({
              ...prev,
              settings: {
                ...prev.settings,
                dailyQueueLimit: Number(e.target.value),
              },
            }));
          }}
        />
      </div>
    </div>
  );
};

export default ProfileData;
