import React from "react";
import { useState } from "react";
import { useContext } from "react";
import BaseAPI from "../../../API/BaseAPI";
import { AuthContext } from "../../../context";

import cl from "./login.module.css";
import AnimatedBtn from "../../UI/AnimatedBtn/AnimatedBtn";
import { isEmailValid } from "../../../utils/validation";
import { useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const SignUpBox = ({ setLoginMode }) => {
  const router = useNavigate();
  const pageParam = useParams();
  const [err, setErr] = useState("");
  // eslint-disable-next-line no-unused-vars
  const { userAuth, setUserAuth } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(pageParam.email ? pageParam.email : "");
  const [password, setPassword] = useState("");

  const newUser = async (data) => {
    if (!isEmailValid(email)) {
      // setPopup.error("email is invalid");
      setErr("email is invalid");
      return;
    }
    if (!password) {
      // setPopup.error("password is empty");
      setErr("password is empty");
      return;
    }
    let ok = await BaseAPI.createUser({
      name: name,
      email: email,
      password: password,
    });

    if (!ok.error) {
      router("/login/" + email);
    } else {
      setErr(ok.error);
    }
  };

  return (
    <CSSTransition appear={true} in={true} timeout={500} classNames="result">
      <div className={cl.login_block}>
        <h1 className={cl.h1login}>REGISTER</h1>{" "}
        <input
          className={cl.inputlogin}
          type="text"
          value={email}
          placeholder="Username*"
          id="username"
          onChange={(e) => {
            if (err) setErr("");
            setEmail(e.target.value);
          }}
        />
        <input
          className={cl.inputlogin}
          type="password"
          value={password}
          placeholder="Password*"
          id="password"
          onChange={(e) => {
            if (err) setErr("");
            setPassword(e.target.value);
          }}
        />
        <input
          className={cl.inputlogin}
          type="string"
          value={name}
          placeholder="Name"
          id="name"
          onChange={(e) => {
            if (err) setErr("");
            setName(e.target.value);
          }}
        />
        <AnimatedBtn
          title="Back to login form"
          onClick={() => setLoginMode(true)}
        />
        <div className={cl.err}>{err}</div>
        <button className={cl.logbutton} onClick={newUser}>
          Sign Up
        </button>
      </div>
    </CSSTransition>
  );
};

export default SignUpBox;
