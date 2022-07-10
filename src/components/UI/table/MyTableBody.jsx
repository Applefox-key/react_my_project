import React from "react";
import RowContent from "./RowContent";

const MyTableBody = ({ btnsArray = [], onRowClick = "", ...props }) => {
  return (
    <tbody>
      {props.dataArray.map((word, i) => (
        <tr
          key={"row" + i}
          onClick={(e) => {
            e.stopPropagation();
            onRowClick(word);
          }}
        >
          <RowContent
            word={word}
            i={i}
            btnsArray={btnsArray}
            namesArray={props.namesArray}
          />
        </tr>
      ))}
    </tbody>
  );
};

export default MyTableBody;
