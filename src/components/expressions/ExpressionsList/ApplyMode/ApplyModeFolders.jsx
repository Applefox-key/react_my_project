import React from "react";
import ApplyMode from "./ApplyMode";
import DropDownList from "../../../UI/DropDownList/DropDownList";
import { statusArr } from "../../../../constants/statusConst";
import { validateAndApplyStatusChange } from "../../../../utils/validation";
import SelectLabel from "../../../Labels/SelectLabel";
import Swal from "sweetalert2";

const ApplyModeFolders = ({ applyMode, expressionActions, expressions }) => {
  const callbackApply = (fnName, param) => {
    Swal.fire({
      title: "Apply action?",
      text: "Action will be apply for all selected items",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        expressionActions[fnName]({ list: applyMode.list, ...param });
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
        onValueChange={(nv) =>
          callbackApply("updateFieldForList", {
            field: "inQueue",
            fieldValue: nv,
          })
        }
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
          formForSet
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
