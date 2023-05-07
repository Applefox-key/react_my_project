import React from "react";
import { useState } from "react";
import { useContext } from "react";
import BaseAPI from "../../../API/BaseAPI";
import { AuthContext } from "../../../context";
import { useNavigate, useParams } from "react-router-dom";
import cl from "./login.module.scss";
import AnimatedBtn from "../../UI/AnimatedBtn/AnimatedBtn";
import { isEmailValid } from "../../../utils/validation";

const LoginBox = ({ setLoginMode }) => {
  const router = useNavigate();
  const pageParam = useParams();

  // eslint-disable-next-line no-unused-vars
  const { userAuth, setUserAuth } = useContext(AuthContext);
  const [email, setEmail] = useState(pageParam.email ? pageParam.email : "");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const login = async (event) => {
    if (!isEmailValid(email)) {
      setErr("email is invalid");
      return;
    }
    if (!password) {
      setErr("password is empty");
      return;
    }
    try {
      let response = await BaseAPI.login(email, password);
      setUserAuth({ isAuth: true, role: response.role });
      router(`/manager`);
    } catch (error) {
      alert(error);

      setErr(error.message);
    }
  };

  return (
    <div className={cl.login_block}>
      <h1 className={cl.h1login}>Login</h1>{" "}
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
      <input
        className={cl.inputlogin}
        type="password"
        value={password}
        placeholder="Password"
        id="password"
        onChange={(e) => {
          if (err) setErr("");
          setPassword(e.target.value);
        }}
      />{" "}
      <AnimatedBtn
        title="Forgot your password"
        onClick={() => setLoginMode(3)}
      />
      <AnimatedBtn
        title=" Create Your Account"
        onClick={() => setLoginMode(2)}
      />
      <div className={cl.err}>{err}</div>
      <button className={cl.logbutton} onClick={login}>
        Login
      </button>
    </div>
  );
};

export default LoginBox;
