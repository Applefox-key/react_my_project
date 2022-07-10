import React from "react";

import ColumnWithBtns from "./ColumnWithBtns";

const RowContent = ({ word, i, btnsArray, namesArray }) => {
  return (
    <>
      <td key="cln">{i + 1}</td>
      {namesArray.map((column) => (
        <td key={column}>{word[column]}</td>
      ))}

      {btnsArray && <ColumnWithBtns btnsArray={btnsArray} word={word} />}
    </>
  );
};

export default RowContent;
