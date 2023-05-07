import React from "react";
import { useState } from "react";
import { useContext } from "react";
import BaseAPI from "../../../API/BaseAPI";
import { AuthContext } from "../../../context";
import { useParams } from "react-router-dom";
import cl from "./login.module.scss";
import AnimatedBtn from "../../UI/AnimatedBtn/AnimatedBtn";
import { isEmailValid } from "../../../utils/validation";

const ForgotBox = ({ setLoginMode }) => {
  const pageParam = useParams();

  // eslint-disable-next-line no-unused-vars
  const { userAuth, setUserAuth } = useContext(AuthContext);
  const [email, setEmail] = useState(pageParam.email ? pageParam.email : "");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const getToken = async (event) => {
    if (!isEmailValid(email)) {
      setErr("email is invalid");
      return;
    }

    try {
      await BaseAPI.sendMailResetToken(email);
      if (err) setErr("");
      setSuccess("please check you email");
    } catch (error) {
      alert(error);
      setErr(error.message);
    }
  };

  return (
    <div className={cl.login_block}>
      <h1 className={cl.h1login}>Password restore</h1>{" "}
      <p>
        enter your email and click SUBMIT, you will receive an email with a link
        to change your password
      </p>
      <input
        className={cl.inputlogin}
        type="text"
        value={email}
        placeholder="Username"
        id="username"
        onChange={(e) => {
          if (err) setErr("");
          setEmail(e.target.value);
        }}
      />
      <AnimatedBtn
        title=" Back to login form"
        onClick={() => setLoginMode(1)}
      />
      <div className={cl.err}>{err}</div>
      <div className={cl.success}>{success}</div>
      {!success && (
        <button className={cl.logbutton} onClick={getToken}>
          SUBMIT
        </button>
      )}
    </div>
  );
};

export default ForgotBox;
