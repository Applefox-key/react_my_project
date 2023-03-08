import Pagination from "react-bootstrap/Pagination";
import React from "react";

const MyPaginationBtstr = ({ total, activeItem, setActive }) => {
  let items = [];

  for (let number = 1; number <= total; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activeItem}
        onClick={() => setActive(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="m-auto">
      {" "}
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default MyPaginationBtstr;
