import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";

const RadioCheck = ({ list, val, callback }) => {
  const [choice, setChoice] = useState(val);
  return (
    <div className="modes">
      {list.map((m, i) => (
        <Form.Check
          key={m}
          custom
          inline
          label={m}
          id={i}
          type="radio"
          name="mode"
          checked={choice === m}
          value={m}
          onChange={(event) => {
            setChoice(event.target.value);
            callback(event);
          }}
        />
      ))}
    </div>
  );
};

export default RadioCheck;
