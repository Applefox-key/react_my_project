import React from "react";

const MyTableHeader = ({ namesArray, btnsArray = [] }) => {
  return (
    <thead className="fs-5">
      <tr>
        <th key="c">#</th>
        {namesArray.map((item) => (
          <th key={item}>{item}</th>
        ))}
        {btnsArray ? <th key="btnA"></th> : <></>}
      </tr>
    </thead>
  );
};

export default MyTableHeader;
