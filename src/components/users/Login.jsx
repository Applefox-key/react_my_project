import React from "react";
import { useState } from "react";
import { useContext } from "react";
import BaseAPI from "../../API/BaseAPI";
import { AuthContext } from "../../context";
import { Link, useNavigate, useParams } from "react-router-dom";
import cl from "./login.module.css";

const Login = () => {
  const router = useNavigate();
  const pageParam = useParams();

  // eslint-disable-next-line no-unused-vars
  const { userAuth, setUserAuth } = useContext(AuthContext);
  const [email, setEmail] = useState(pageParam.email ? pageParam.email : "");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    try {
      let response = await BaseAPI.login(email, password);
      setUserAuth({ isAuth: true, role: response.role });
      router(`/manager`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={cl.page}>
      <br />
      <div className={cl.login_block}>
        <h1 className={cl.h1login}>Login</h1>{" "}
        <Link className="text-primary" to="/signup">
          Creat Your Account
        </Link>{" "}
        <input
          className={cl.inputlogin}
          type="text"
          value={email}
          placeholder="Username"
          id="username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={cl.inputlogin}
          type="password"
          value={password}
          placeholder="Password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={cl.logbutton} onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
