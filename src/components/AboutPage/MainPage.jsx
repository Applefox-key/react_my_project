import React, { useState } from "react";
import { useRef } from "react";
import Logo from "../Logo";
import ForgotBox from "../users/Login/ForgotBox";
import LoginBox from "../users/Login/LoginBox";
import SignUpBox from "../users/Login/SignUpBox";
import cl from "./About.module.scss";
import AboutBooks from "./AboutBooks";

const MainPage = () => {
  const [loginMode, setLoginMode] = useState(1);
  const scollToRef = useRef();
  return (
    <div className={cl.pagecontent}>
      <div className={cl.imgabout} />
      {/* <div
        className="d-flex flex-column justify-content-center"
        style={{ width: "20%" }}> */}
      <div className={cl.text_container_public}>
        {" "}
        <div className={cl.text1}>Try the 90 seconds method</div>
        <div className={cl.text2}>Sign In to Learn Fast</div>
        <div className={cl.text2}>if you don’t have an account you can</div>
        <button
          className={cl.text2 + " " + cl.btn}
          onClick={() => {
            setLoginMode(2);
            scollToRef.current.scrollIntoView();
          }}>
          Join Us
        </button>
      </div>
      <div className="color_container"></div>
      <br />
      <div style={{ zIndex: "600" }}>
        {" "}
        <br ref={scollToRef} />
        {loginMode === 1 && <LoginBox setLoginMode={setLoginMode} />}
        {loginMode === 2 && <SignUpBox setLoginMode={setLoginMode} />}
        {loginMode === 3 && <ForgotBox setLoginMode={setLoginMode} />}
      </div>{" "}
      <AboutBooks />
      <div className="w-10">
        <Logo />
      </div>
    </div>
  );
};

export default MainPage;
