import React from "react";

const MyTableHeader = ({ namesArray, btnsArray = [] }) => {
  return (
    <thead>
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
