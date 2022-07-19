import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import MyInputGroup from "../UI/input/MyInputGroup";
import MyModal from "../UI/MyModal";

const ExpressionEdit = ({ visible, setVisible, expression, onClick }) => {
  const [newExpression, setNewwExpression] = useState(expression.expression);
  const [newPhrase, setNewPhrase] = useState(expression.phrase);

  return (
    <MyModal
      visible={visible}
      setVisible={setVisible}
      title={expression.expression}
      fullscreen={true}
    >
      <MyInputGroup
        label="new phrase"
        value={newPhrase}
        onChange={(e) => setNewPhrase(e.target.value)}
      />
      <MyInputGroup
        label="expression"
        value={newExpression}
        onChange={(e) => setNewwExpression(e.target.value)}
      >
        <Button
          onClick={() => {
            onClick(expression.id, newExpression, newPhrase);
          }}
        >
          Save changes
        </Button>
      </MyInputGroup>
    </MyModal>
  );
};
export default ExpressionEdit;
