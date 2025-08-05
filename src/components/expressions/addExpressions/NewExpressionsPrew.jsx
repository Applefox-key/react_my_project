import React, { useState } from "react";
import cl from "./addExpressions.module.scss";
import { usePopup } from "../../../hooks/usePopup";
import DropDownList from "../../UI/DropDownList/DropDownList";
import { Button, Table } from "react-bootstrap";
import { sAlert } from "../../../utils/alert";

const NewExpressionsPrew = (props) => {
  const [numbers, setNumbers] = useState({
    expression: 0,
    phrase: 1,
    note: 2,
  });

  const setPopup = usePopup();
  const onSelectField = (val, colIndex) => {
    setNumbers((prev) => {
      const prevCol = Object.keys(prev).find((key) => prev[key] === colIndex);
      const updated = { ...prev };
      if (prevCol) {
        updated[prevCol] = null;
      }
      if (val !== "-") {
        updated[val] = colIndex;
      }
      return updated;
    });
  };
  const next = (e) => {
    const hasEmptyFields = props.dataArray.some(
      (item, i) => !item[numbers.phrase]
    );
    if (hasEmptyFields) {
      e.preventDefault();
      setPopup.error(`Error: missing value in phrase`);
      return;
    }
    const res = props.dataArray.map((item, i) => {
      return {
        phrase: item[numbers.phrase] || "",
        expression: item[numbers.expression] || "",
        note: item[numbers.note] || "",
      };
    });

    props.setSelectedContent(res);
  };

  const expressionDelete = (inum) => {
    // if (!window.confirm("Delete the phrase?")) return false;

    const result = sAlert({
      title: "Delete this phrase?",
      text: "This action cannot be undone.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return false;

    props.changeDataArr(props.dataArray.filter((el, i) => i !== inum));
  };
  const rowC = (row) => {
    let maxJ = 0;
    const res = props.dataArray.map((row, i) => {
      const columns = row.map((col, j) => {
        if (j > maxJ) maxJ = j;
        return (
          <td key={"col" + j} className={cl.col}>
            {col}
          </td>
        );
      });
      return (
        <tr>
          {columns}{" "}
          <td>
            <button
              className={cl.deleteBtn}
              onClick={() => expressionDelete(i)}>
              ✕
            </button>
          </td>
        </tr>
      );
    });
    const firstRow = Array.from({ length: maxJ + 1 }, (_, i) => {
      const selectedField =
        Object.keys(numbers).find((key) => numbers[key] === i) || "-";

      return (
        <td key={"f" + i}>
          <DropDownList
            val={selectedField}
            list={["-", "expression", "phrase", "note"]}
            onValueChange={(selected) => onSelectField(selected, i)}
          />
        </td>
      );
    });

    res.unshift(<tr key="firstRow">{firstRow}</tr>);
    return res;
  };

  return props.dataArray ? (
    <div className="modal-h50">
      <div className={cl.fileModalBtns}>
        <Button
          size="lg"
          className="mt-1"
          variant="outline-secondary"
          onClick={() => props.setVisible(false)}>
          Calcel
        </Button>{" "}
        <Button
          size="lg"
          className="mt-1"
          variant="outline-secondary"
          onClick={next}>
          NEXT
        </Button>{" "}
      </div>
      <Table
        borderless
        className={
          props.classtbl ? "border_r15 " + props.classtbl : "border_r15"
        }>
        {rowC()}
      </Table>
    </div>
  ) : (
    <></>
  );
};
export default NewExpressionsPrew;
