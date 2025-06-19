import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { RiArrowGoBackLine } from "react-icons/ri";
import ExpModalCommand from "./ExpModalCommand";

const ExpressionsMenuIcons = ({ expressionsActions }) => {
  const [mod, setMod] = useState(false);

  const router = useNavigate();

  return (
    <>
      {mod && (
        <ExpModalCommand
          mod={mod}
          setMod={setMod}
          setExpressions={expressionsActions.setExpressions}
        />
      )}
      <button title="add one" onClick={expressionsActions.addNew}>
        <GoPlus />
      </button>
      <button title="Back to training" onClick={() => router("/training")}>
        <RiArrowGoBackLine />
      </button>
    </>
  );
};

export default ExpressionsMenuIcons;
