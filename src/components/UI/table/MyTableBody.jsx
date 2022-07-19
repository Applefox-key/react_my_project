import React from "react";
import RowContent from "./RowContent";

const MyTableBody = ({ btnsArray = [], onRowClick = "", ...props }) => {
  const editId = props.edit ? props.edit.content.id : null;
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
            edit={editId === element.id ? props.edit : null}
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
