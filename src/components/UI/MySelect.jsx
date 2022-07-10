import React from "react";
import Form from "react-bootstrap/Form";

const MySelect = ({ defaultOption, onChange, optionslist }) => {
  return (
    <div className="d-flex justify-content-center padding25">
      {/* <InputGroup.Text> {label}</InputGroup.Text> */}
      <Form.Select onChange={onChange}>
        <option value={defaultOption.id} key={"d"}>
          {defaultOption.name}
        </option>
        {optionslist.map((el, i) => (
          <option value={el.id} key={i}>
            {el.name}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default MySelect;
