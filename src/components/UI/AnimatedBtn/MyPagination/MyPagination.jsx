import React from "react";
import cl from "./MyPagination.module.css";

const MyPagination = ({ total, activeItem, setActive }) => {
  let items = [];

  for (let number = 0; number <= total; number++) {
    items.push(
      <div
        className={cl.item + (number === activeItem ? " " + cl.itemActive : "")}
        key={number}
        active={number === activeItem}
        onClick={() => setActive(number)}>
        {number === 0 ? "all" : number}
      </div>
    );
  }

  return (
    <div className="m-auto">
      <div className={cl.wrap}>{items}</div>
    </div>
  );
};

export default MyPagination;
