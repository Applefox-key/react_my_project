import React from "react";
import ApplyMode from "./ApplyMode";
import DropDownList from "../../../UI/DropDownList/DropDownList";
import { statusArr } from "../../../../constants/statusConst";
import { validateAndApplyStatusChange } from "../../../../utils/validation";
import SelectLabel from "../../../Labels/SelectLabel";

import { sAlert } from "../../../../utils/alert.js";

const ApplyModeFolders = ({ applyMode, expressionActions, expressions }) => {
  const callbackApply = (fnName, param) => {
    sAlert({
      title: "Apply action?",
      text: "Action will be apply for all selected items",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        expressionActions[fnName]({ list: applyMode.list, ...param });
        applyMode.applyOnOF();
      }
    });
  };

  return (
    <ApplyMode
      applyMode={applyMode}
      checkAll={() => applyMode.selectAllApply(expressions)}>
      <button onClick={() => callbackApply("deleteSome")}>delete</button>

      <button onClick={() => callbackApply("createFile")}>
        download phrases
      </button>
      <DropDownList
        val={"set status"}
        onValueChange={(nv) => {
          // status validation
          const callback = (nl) =>
            callbackApply("changeStatusField", {
              field: "status",
              fieldValue: nv,
              list: nl,
            });
          validateAndApplyStatusChange(
            nv,
            applyMode.list,
            expressions,
            callback
          );
        }}
        list={[...statusArr]}
      />
      <DropDownList
        val={"Queue manage"}
        onValueChange={(nv) => {
          return callbackApply("updateFieldForList", {
            field: "inQueue",
            fieldValue: nv === "add to queue" || nv === 1 ? 1 : 0,
          });
        }}
        list={["add to queue", "remove from queue"]}
      />
      <button
        onClick={() =>
          expressionActions.updateLabelsForList({
            list: applyMode.list,
            labelid: undefined,
          })
        }>
        clear tags
      </button>
      <div>
        <SelectLabel
          onSelect={(nv) =>
            callbackApply("updateLabelsForList", {
              list: applyMode.list,
              labelid: nv.id,
            })
          }
        />
      </div>
    </ApplyMode>
  );
};

export default ApplyModeFolders;
