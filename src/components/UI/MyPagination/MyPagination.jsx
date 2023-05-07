import React from "react";
import cl from "./MyPagination.module.css";

const MyPagination = ({ setPageParams, pageParams }) => {
  let items = [];

  for (let number = 0; number <= pageParams.pageTotal; number++) {
    items.push(
      <div
        className={
          cl.item + (number === pageParams.page ? " " + cl.itemActive : "")
        }
        key={number}
        // active={number === pageParams.page}
        onClick={() => setPageParams({ ...pageParams, page: number })}>
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
