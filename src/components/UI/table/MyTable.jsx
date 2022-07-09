import React from "react";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";
import MyTableBody from "./RowContent";
import MyTableHeader from "./MyTableHeader";
import RowContent from "./RowContent";

const MyTable = ({
  dataArray,
  namesArray,
  onRowClick = "",
  btnsArray = [],
}) => {
  return (
    <Table striped bordered hover className=" border-2 pointer">
      <MyTableHeader namesArray={namesArray} btnsArray={btnsArray} />

      <tbody>
        {dataArray.map((word, i) => (
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
              namesArray={namesArray}
            />
          </tr>
        ))}
      </tbody>

      {/* <MyTableBody props={props} /> */}
    </Table>
  );
};

export default MyTable;
