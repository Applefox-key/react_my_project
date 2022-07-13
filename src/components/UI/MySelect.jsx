import React from "react";
import Form from "react-bootstrap/Form";

const MySelect = ({
  defaultOption,
  onChange,
  optionslist,
  val = "id",
  text = "name",
}) => {
  return (
    <div className="d-flex justify-content-center padding25">
      <Form.Select style={{ width: "fit-content" }} onChange={onChange}>
        <option value={defaultOption[val]} key={"d"}>
          {defaultOption[text]}
        </option>
        {optionslist.map((el, i) => (
          <option value={el[val]} key={i}>
            {el[text]}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default MySelect;
