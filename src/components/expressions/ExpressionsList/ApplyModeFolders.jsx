import React, { useState } from "react";
import ApplyMode from "./ApplyMode";
import cl from "./ExpressionsList.module.scss";
import { Form } from "react-router-dom";
import SelectLabelList from "../../Labels/SelectLabelList";
const ApplyModeFolders = ({ applyMode, expressionsActions, expressions }) => {
  const [label, setLabel] = useState("");
  return (
    <ApplyMode
      applyMode={applyMode}
      checkAll={() => applyMode.selectAllApply(expressions)}>
      <button
        onClick={() => expressionsActions.deleteSome({ list: applyMode.list })}>
        delete
      </button>
      {/* <button onClick={expressionsActions.changeExpressionLabels}>
                apply label
              </button> */}
      <button
        onClick={() =>
          expressionsActions.labelToArr({
            list: applyMode.list,
            labelid: undefined,
          })
        }>
        clear label
      </button>
      <button
        onClick={() => expressionsActions.createFile({ list: applyMode.list })}>
        download phrases
      </button>
      {/* <button
        className="tmp-add-btn"
        onClick={() =>
          expressionsActions.labelToArr({
            list: applyMode.list,
            labelid: undefined,
          })
        }>
        set label
      </button>
      <SelectLabelList /> */}
      {/* <Form.Control
        as="input"
        list="group-options"
        className="tmp-add-text0"
        placeholder="group"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      /> */}
      {/* <datalist id="group-options">
        {levels.map((option, idx) => (
          <option value={option} key={idx} />
        ))}
      </datalist> */}
    </ApplyMode>
  );
};

export default ApplyModeFolders;
