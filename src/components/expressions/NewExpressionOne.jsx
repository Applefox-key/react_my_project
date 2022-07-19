import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import MyInputGroup from "../UI/input/MyInputGroup";

const NewExpressionOne = ({ addExpression }) => {
  const [newExpression, setNewExpression] = useState({ expression: "", phrase: "" });
  return (
    <>
      <MyInputGroup
        text="phrase"
        placeholder="phrase"
        value={newExpression.phrase}
        onChange={(e) => setNewExpression({ ...newExpression, phrase: e.target.value })}
      />
      <MyInputGroup
        text="new expression"
        placeholder="expression"
        value={newExpression.expression}
        onChange={(e) => setNewExpression({ ...newExpression, expression: e.target.value })}
      >
        <Button
          variant="outline-dark"
          onClick={(e) => {
            e.stopPropagation();
            addExpression(newExpression);
            setNewExpression({ expression: "", phrase: "" });
          }}
        >
          Add new expression
        </Button>
      </MyInputGroup>
    </>
  );
};

export default NewExpressionOne;
