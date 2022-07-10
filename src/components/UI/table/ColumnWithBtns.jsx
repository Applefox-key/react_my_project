import React from "react";
import Button from "react-bootstrap/esm/Button";

const ColumnWithBtns = ({ btnsArray, word }) => {
  return (
    <td key="btnA">
      {btnsArray.map((btn, i) => (
        <Button
          key={i}
          variant="link"
          onClick={(e) => {
            e.stopPropagation();
            btn.callback(word);
          }}
        >
          {btn.name}
        </Button>
      ))}
    </td>
  );
};

export default ColumnWithBtns;
