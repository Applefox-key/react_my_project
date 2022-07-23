import React, { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import BaseAPI from "../../API/BaseAPI";
import { PopupContext } from "../../context";
import MyInputGroup from "../UI/input/MyInputGroup";

const NewExpressionOne = ({ setExpressions }) => {
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const [newExpression, setNewExpression] = useState({
    expression: "",
    phrase: "",
  });

  const addExpression = async (newExp) => {
    if (!newExp.expression || !newExp.phrase) {
      setPopupSettings([true, "please fill in both fields", "error"]);
      return;
    }
    await BaseAPI.createExpression(newExp.expression, newExp.phrase);
    setExpressions(await BaseAPI.getTrainingListAll());
  };

  return (
    <>
      <MyInputGroup
        text="phrase"
        placeholder="phrase"
        value={newExpression.phrase}
        onChange={(e) =>
          setNewExpression({ ...newExpression, phrase: e.target.value })
        }
      />
      <MyInputGroup
        text="new expression"
        placeholder="expression"
        value={newExpression.expression}
        onChange={(e) =>
          setNewExpression({ ...newExpression, expression: e.target.value })
        }>
        <Button
          variant="outline-dark"
          onClick={(e) => {
            e.stopPropagation();
            addExpression(newExpression);
            setNewExpression({ expression: "", phrase: "" });
          }}>
          Add new expression
        </Button>
      </MyInputGroup>
    </>
  );
};

export default NewExpressionOne;
