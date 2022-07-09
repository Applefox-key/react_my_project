import React from "react";
import Button from "react-bootstrap/esm/Button";

const RowContent = ({ word, i, btnsArray, namesArray }) => {
  return (
    <>
      <td key="cln">{i + 1}</td>

      {namesArray.map((column) => (
        <td key={column}>{word[column]}</td>
      ))}

      {btnsArray.map((btn) => (
        <td key={btn.name + i}>
          <Button
            variant="link"
            onClick={(e) => {
              e.stopPropagation();
              btn.callback(word);
            }}
          >
            {btn.name}
          </Button>
        </td>
      ))}
    </>
  );
};

export default RowContent;
