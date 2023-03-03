import React, { useState } from "react";
import { useRef } from "react";
import Logo from "../Logo";
import LoginBox from "../users/Login/LoginBox";
import SignUpBox from "../users/Login/SignUpBox";
import cl from "./About.module.css";
import AboutBox from "./AboutBox";

const MainPage = () => {
  const [loginMode, setLoginMode] = useState(true);
  const scollToRef = useRef();
  return (
    <>
      <div className="color_container"></div>
      <div className={cl.text_container}>
        {" "}
        <div className={cl.text1}>Try the 90 seconds method</div>
        <div className={cl.text2}>Sign In to Learn Fast</div>
        <div className={cl.text2}>if you don’t have an account you can</div>
        <button
          className={cl.text2 + " " + cl.btn}
          onClick={() => {
            setLoginMode(false);
            scollToRef.current.scrollIntoView();
          }}>
          Join Us
        </button>
      </div>
      <br />
      <div className={cl.pagecontent}>
        <AboutBox />

        <div>
          {" "}
          <br ref={scollToRef} />
          {loginMode ? (
            <LoginBox setLoginMode={setLoginMode} />
          ) : (
            <SignUpBox setLoginMode={setLoginMode} />
          )}
          {/* <br ref={scollToRef} /> */}
        </div>
      </div>{" "}
      <div className="w-10">
        <Logo />
      </div>
    </>
  );
};

export default MainPage;
