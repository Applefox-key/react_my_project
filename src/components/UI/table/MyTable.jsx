import React from "react";

import MyTableBody from "./MyTableBody";
import MyTableHeader from "./MyTableHeader";

const MyTable = (props) => {
  return props.dataArray ? (
    <table>
      <MyTableHeader {...props} />
      <MyTableBody {...props} />
    </table>
  ) : (
    <></>
  );
};

export default MyTable;
