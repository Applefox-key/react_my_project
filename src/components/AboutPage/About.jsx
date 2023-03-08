import React from "react";
import cl from "./About.module.css";
import clLog from "../users/Login/login.module.css";
import Logo from "../Logo";
import AboutBox from "./AboutBox";

const About = () => {
  return (
    <div>
      <div className="color_container"></div>
      <div className={cl.text_container}>
        {" "}
        <div className={cl.text1}>Learn More </div>
        <div className={cl.text2}>about the 90 seconds method</div>
        <div className={cl.text2}>or</div>
        <a
          href={`http://learnapp.me/about`}
          className={cl.text2 + " " + cl.btn}>
          Try flash cards methods
        </a>
      </div>
      <br />
      <div className={cl.pagecontent}>
        <AboutBox />{" "}
        <div className={clLog.login_block} style={{ textAlign: "left" }}>
          <h1 className={cl.h1login}>SHORT INSTRUCTION</h1> <br />
          <h2>Add a word to your list</h2> <br />
          <h2>Read it according the plan</h2> <br />
          <h2>Spend only 90 seconds of your time</h2>
        </div>{" "}
      </div>{" "}
      <div className="w-10">
        <Logo />
      </div>
    </div>
  );
};

export default About;
