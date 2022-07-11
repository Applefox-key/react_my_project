import React from "react";
import RowContent from "./RowContent";

const MyTableBody = ({ btnsArray = [], onRowClick = "", ...props }) => {
  return (
    <tbody>
      {props.dataArray.map((element, i) => (
        <tr
          key={"row" + i}
          onClick={(e) => {
            e.stopPropagation();
            if (onRowClick) onRowClick(element);
          }}
        >
          <RowContent
            content={element}
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
