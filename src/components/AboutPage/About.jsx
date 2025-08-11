import React from "react";
import cl from "./About.module.scss";
import clLog from "../users/Login/login.module.scss";
import Logo from "../Logo";
import { shortInstructions } from "../../constants/aboutSections";
import AboutCards from "./AboutCards";

const About = () => {
  return (
    <div className={cl["about-wrap"]}>
      <div className="color_container"></div>
      <div className={cl.text_container}>
        <div className={cl.text1}>Learn More </div>
        <div className={cl.text2}>
          about the 90 seconds method or{" "}
          <a
            href={`http://learnapp.pro/about`}
            className={cl.text2 + " " + cl.btn}>
            try flash cards methods
          </a>
        </div>
      </div>
      <br />
      <div className={cl.pagecontentPr}>
        <AboutCards />
        <div className={clLog.login_block_short}>
          <h1 className={cl.h1login}>SHORT INSTRUCTION</h1> <br />
          {shortInstructions.map((el, i) => (
            <>
              <h2 key={i}>{el}</h2>
              <br />
            </>
          ))}
        </div>
      </div>
      <div className="w-10">
        <Logo />
      </div>
    </div>
  );
};

export default About;
