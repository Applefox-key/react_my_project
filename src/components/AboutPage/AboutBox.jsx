import React, { useState } from "react";
import cl from "./About.module.scss";

const AboutBox = () => {
  const [currentBook, setCurrentBook] = useState(1);
  const switchBook = (book) => {
    setCurrentBook(book === currentBook ? 0 : book);
  };
  return (
    <div className={cl.aboutBox}>
      <div className={cl.imgabout} />{" "}
      <div className={cl.bookShelf}>
        {" "}
        <div className={cl.books + (currentBook ? " " + cl.books_hover : "")}>
          {" "}
          <div
            onClick={() => switchBook(1)}
            className={
              cl.onebook + (currentBook === 1 ? " " + cl.onebook_hover : "")
            }>
            <div className={cl.bookdiv}>
              <p>ABOUT</p>

              <div className={cl.booktext}>
                {" "}
                <p>
                  This page <span>will help you remember </span>a new phrase or
                  word using the 90 seconds technique.
                </p>
                <p>
                  You just need to add sentences to memorize to your list and
                  <span> just read the phrase according to the schedule</span>.
                </p>{" "}
                <p>HINTS:</p>
                <ul>
                  <li> add a label to order your phrases list. </li>
                  <li>
                    select a part of your phrase to highlight it during the
                    training.
                  </li>{" "}
                  <li>add a note to have a pop-up note during the training</li>
                </ul>
              </div>
            </div>
          </div>
          <div
            onClick={() => switchBook(2)}
            className={
              cl.onebook + (currentBook === 2 ? " " + cl.onebook_hover : "")
            }>
            <div className={cl.bookdiv}>
              <p>STRATEGY</p>
              <div className={cl.booktext}>
                <p>
                  When you see a new expression, you should{" "}
                  <span>write it down </span>in your notes.
                </p>
                <p>
                  <span>Give it some context.</span> Don't just write the
                  translation of depend.
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
          <div
            onClick={() => switchBook(3)}
            className={
              cl.onebook + (currentBook === 3 ? " " + cl.onebook_hover : "")
            }>
            <div className={cl.bookdiv}>
              <p>PLAN</p>
              <div className={cl.booktext}>
                <p>
                  <span> For 7 days, read expression out loud 2 times. </span>
                  One time it is allowed to read an expression a day later.
                </p>

                <p>
                  <span>
                    {" "}
                    1 weeks later, and then 2 week later read it out loud again
                    (3 times).{" "}
                  </span>
                  It is allowed to read the expression with a delay of 2 days
                  one time
                </p>

                <p>
                  <span>70 + 10 + 10 = 90 seconds.</span> It takes 10 seconds to
                  read a phrase.{" "}
                </p>
                <p>
                  <span>
                    If the number of deviations from the plan has exceeded the
                    permissible ones, just try again!
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div
            onClick={() => switchBook(4)}
            className={
              cl.onebook + (currentBook === 4 ? " " + cl.onebook_hover : "")
            }>
            <br />
            <div className={cl.bookdiv}>
              <p>INSTRUCTIONS</p>
              <div className={cl.booktext}>
                <p>Don't make yourself necessarily memorize an expresion. </p>{" "}
                <p>
                  Just <span>concentrate</span> on it and try to understand what
                  you are really saying.
                </p>
                <p>
                  <span>Read</span> an expresiion <span>out loud</span>,
                  emotionally and clearly, with full concentration.
                </p>
                <p>
                  This strategy allows you to cement the expression in your
                  memory.
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
