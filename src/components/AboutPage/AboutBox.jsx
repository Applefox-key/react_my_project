import React from "react";
import cl from "./About.module.css";

const AboutBox = () => {
  return (
    <div className={cl.aboutBox}>
      <div className={cl.imgabout} />{" "}
      <div className="d-flex">
        {" "}
        <div className={cl.books}>
          {" "}
          <div className={cl.onebook}>
            <div className={cl.bookdiv}>
              <p>ABOUT</p>

              <div className={cl.booktext}>
                {" "}
                <p>
                  This page will help you remember a new phrase or word using
                  the 90 seconds technique.
                </p>
                <p>
                  You just need to add sentences to memorize to your list and
                  read this phrase according to the schedule.
                </p>
              </div>
            </div>
          </div>
          <div className={cl.onebook}>
            <div className={cl.bookdiv}>
              <p>STRATEGY</p>
              <div className={cl.booktext}>
                <p>
                  When you see a new expression, you should write it down in
                  your notes.
                </p>
                <p>
                  Give it some context. Don't just write the translation of
                  depend.
                </p>
                <p>Write down the phrase you saw or heard in an sentence.</p>
                <p>
                  In this way, you will get a ton of useful details
                  (prepositions, articles, expression order, and so on), and
                  most importantly, you will be able to say the phrase when you
                  need it.
                </p>
              </div>
            </div>
          </div>
          <div className={cl.onebook}>
            <div className={cl.bookdiv}>
              <p>PLAN</p>
              <div className={cl.booktext}>
                <p>
                  For 7 days, you should read this expression out loud 1-2
                  times.
                </p>
                <p>
                  After 7 days of everyday repetition, you should take a
                  one-week break.
                </p>{" "}
                <p>After the break, read the phrase 3 times.</p>
                <p>2 weeks later, read it out loud again (3 times).</p>
                <p>It takes 10 seconds to read a phrase.</p>
                <p>70 + 10 + 10 = 90 seconds.</p>
              </div>
            </div>
          </div>
          <div className={cl.onebook}>
            <br />
            <div className={cl.bookdiv}>
              <p>INSTRUCTIONS</p>
              <div className={cl.booktext}>
                <p>Don't make yourself necessarily memorize an expresion. </p>{" "}
                <p>
                  Just concentrate on it and try to understand what you are
                  really saying.
                </p>
                <p>
                  Read an expresiion out loud, emotionally and clearly, with
                  full concentration.
                </p>
                <p>
                  This strategy allows you to cement the expression in your
                  memory. All of this has been checked by the author of this
                  method.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBox;
