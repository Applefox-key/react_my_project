import React from "react";
import Button from "react-bootstrap/esm/Button";

const ColumnHeadWithBtns = ({ btnsArray }) => {
  return (
    <th>
      {btnsArray
        .filter((el) => el.nameMain)
        .map((btn, i) => (
          <Button
            key={i}
            variant="link"
            onClick={(e) => {
              e.stopPropagation();
              btn.callback();
            }}>
            {btn.nameMain}
          </Button>
        ))}
    </th>
  );
};

export default ColumnHeadWithBtns;