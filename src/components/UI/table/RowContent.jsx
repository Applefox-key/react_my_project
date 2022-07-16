import React, { useState } from "react";

import ColumnWithBtns from "./ColumnWithBtns";

const RowContent = ({ content, i, btnsArray, namesArray }) => {
  return (
    <>
      <td key="cln">{i + 1}</td>
      {namesArray.map((column) =>
        Object.prototype.toString.call(content[column]) == "[object Date]" ? (
          <td key={column}>{content[column].toISOString().slice(0, 10)}</td>
        ) : (
          <td key={column}>{content[column]}</td>
        )
      )}
      {btnsArray && <ColumnWithBtns btnsArray={btnsArray} content={content} />}
    </>
  );
};

export default RowContent;
