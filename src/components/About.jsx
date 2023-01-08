import React from "react";
import pct from "../img/pngkey.png";
const About = () => {
  return (
    // <div className="d-flex mx-3">  className="mx-4 mt-3
    <div className="aboutpageImg">
      <div className="aboutcontent">
        <img src={pct} className="aboutImg" alt="about" />
        <div className="abouttext">
          <h1 className="display-5 text-center aboutH">
            The simple and effective strategy of "the 90 second method"
          </h1>
          <div className="aboutP">
            When you see a new expression, you should write it down in your
            notes. But not just the expression by itself. Give it some context.
            For example, don't just write the translation of depend. It's better
            to write down the phrase you saw or heard the expression in. For
            example, it entirely depends on you. This way, you will get a ton of
            useful details (prepositions, articles, expression order, and so
            on), and most importantly, you will be able to say the phrase when
            you need it. The expression itself should be highlighted or
            underlined.
          </div>
          <div className="aboutP">
            For 7 days, you should read this expression out loud 1-2 times.
            Don't make yourself necessarily memorize it, just concentrate on it
            and try to understand what you are really saying. It takes 10
            seconds to read a phrase twice.
          </div>
          <div className="aboutP">
            After 7 days of everyday repetition, you should take a one-week
            break. After the break, read the phrase 3 times in 10 seconds. You
            should do it out loud, emotionally and clearly, with full
            concentration.
          </div>
          <div className="aboutP">
            2 weeks later, read it out loud again (3 times in 10 seconds).
          </div>
          <div className="aboutP">70 + 10 + 10 = 90 seconds.</div>
          <div className="aboutP">
            This strategy allows you to cement the expression in your memory.
            All of this has been checked by the author of this method.
          </div>
          <br />
        </div>
      </div>
    </div>
    // </div>
  );
};

export default About;
