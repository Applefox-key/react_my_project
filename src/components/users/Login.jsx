import React, { useState } from "react";
import cl from "./login.module.css";
import AboutBox from "./AboutBox";
import LoginBox from "./LoginBox";
import SignUpBox from "./SignUpBox";
import Logo from "../Logo";

const Login = () => {
  const [loginMode, setLoginMode] = useState(true);
  return (
    <div className={cl.page}>
      <br />{" "}
      <div className={cl.pageheadText}>90 seconds to remember anything</div>
      <div className={cl.pagecontent}>
        <br />
        <div className="d-flex h-100 justify-content-around">
          <AboutBox />
        </div>
        <div>" "</div>
        <div>
          {loginMode ? (
            <LoginBox setLoginMode={setLoginMode} />
          ) : (
            <SignUpBox setLoginMode={setLoginMode} />
          )}
        </div>
      </div>{" "}
      <div className="w-10">
        <Logo />
      </div>
    </div>
  );
};

export default Login;
