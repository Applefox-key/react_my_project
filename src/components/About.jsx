import React from "react";

import cl from "./users/login.module.css";
import Logo from "./Logo";
import AboutBox from "./users/AboutBox";

const About = () => {
  return (
    <div className={cl.page}>
      <br />{" "}
      <div className={cl.pageheadText}>90 seconds to remember anything</div>
      <div className={cl.pagecontent}>
        <br />
        <div className="d-flex h-100">
          <AboutBox />
        </div>
      </div>
      <div className="w-10">
        <Logo />
      </div>
    </div>
  );
};

export default About;
