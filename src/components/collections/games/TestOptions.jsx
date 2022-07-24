import React from "react";
import cl from "./Games.module.css";

const TestOptions = ({ items, onClick, active }) => {
  return (
    <div className="flex-center">
      {items.map((el) => (
        <button
          id={el.id}
          onClick={onClick}
          className={[
            cl.list_btn,
            active.includes(el.id.toString()) ? cl.wrong_answer : "",
          ].join(" ")}>
          {el.answer}
        </button>
      ))}
    </div>
  );
};

export default TestOptions;
