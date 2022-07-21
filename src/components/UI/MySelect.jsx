import React from "react";
import Form from "react-bootstrap/Form";

const MySelect = ({ val = "id", text = "name", ...props }) => {
  return (
    <></>
    // <div className="d-flex justify-content-center padding25">
    //   <Form.Select style={{ width: "fit-content" }} onChange={props.onChange}>
    //     <option value={props.defaultOption[val]} key={"d"}>
    //       {props.defaultOption[text]}
    //     </option>
    //     {props.optionslist.map((el, i) => (
    //       <option value={el[val]} key={i}>
    //         {el[text]}
    //       </option>
    //     ))}
    //   </Form.Select>
    // </div>
  );
};

export default MySelect;
