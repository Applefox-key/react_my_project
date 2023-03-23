import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BaseAPI from "../../../API/BaseAPI";
import { usePopup } from "../../../hooks/usePopup";

import cl from "./login.module.css";

const ForgotPassword = () => {
  const setPopup = usePopup();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, setErr] = useState();
  const { resetToken } = useParams();
  useEffect(() => {
    const checkToken = async (token) => {
      try {
        const res = await BaseAPI.CheckResetToken(token);
        return res;
      } catch (error) {
        setErr("400");
      }
    };
    checkToken(resetToken);
  }, [resetToken]);
  const router = useNavigate();

  const setnewpass = async () => {
    try {
      await BaseAPI.setNewPassword(password1, resetToken);
      setPopup.success("password was changed");
      router("/login");
    } catch (error) {
      setErr(error);
    }
  };
  return (
    <div className={cl.login_block}>
      {err === "400" ? (
        <h1 className={cl.h1login}>THE LINK HAS EXPIRED</h1>
      ) : (
        <>
          <h1 className={cl.h1login}>PLEASE enter new password</h1>
          <input
            className={cl.inputlogin}
            type="password"
            value={password1}
            placeholder="password"
            id="password1"
            onChange={(e) => {
              if (err) setErr("");
              setPassword1(e.target.value);
            }}
          />{" "}
          <input
            className={cl.inputlogin}
            type="password"
            value={password2}
            placeholder="password's confirm"
            id="password2"
            onChange={(e) => {
              if (err) setErr("");
              setPassword2(e.target.value);
            }}
          />{" "}
          <div className={cl.err}>{err}</div>
          <button className={cl.logbutton} onClick={setnewpass}>
            Set new password
          </button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
