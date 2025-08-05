import BaseAPI from "../API/BaseAPI";
import { TbMoodConfuzed, TbMoodSad2 } from "react-icons/tb";
import { sAlert } from "./alert";

export const expressionStateIcon = (item) => {
  let days = item.exceededSkipsDays;
  let result = <></>;
  if (days > 2)
    result = (
      <span title="you have deviated greatly from the plan">
        <TbMoodSad2 />
      </span>
    );
  else if (days > 0)
    result = (
      <span title="you deviated from the plan">
        <TbMoodConfuzed />
      </span>
    );
  return result;
};
export const expressionState = (item) => {
  let days = item.exceededSkipsDays;
  let color = "colorBlue";
  if (days > 2) color = "colorRed";
  else if (days > 0) color = "colorOrange";
  return color;
};

export const deleteExpressions = async (expression = "") => {
  let res;
  const result = sAlert({
    title: expression ? "Delete the expression?" : "Delete all expressions?",
    text: "This action cannot be undone.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, delete.",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return false;

  if (expression) {
    // if (!window.confirm("Delete the expression?")) return false;
    res = await BaseAPI.deleteExpression(expression.id);
  } else {
    // if (!window.confirm("Delete all expressions?")) return false;
    res = await BaseAPI.deleteAllExpressions();
  }
  return res;
};
export const deleteSomeExpressions = async (idsArr = []) => {
  let res;
  if (idsArr.length) {
    // if (!window.confirm("Delete the expressions?")) return false;
    const result = sAlert({
      title: "Delete all expressions?",
      text: "This action cannot be undone.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, delete.",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return false;
    res = await BaseAPI.deleteSomeExpressions(idsArr);
  }
  return res;
};
// export const updateLabelsForList = async (expressionsArr, labelid) => {
//   let res = expressionsArr.length
//     ? await BaseAPI.setLabelToExprArr(expressionsArr, labelid)
//     : "";
//   return res;
// };
export const setFieldArr = async (expressionsArr, field, fieldValue) => {
  let res = expressionsArr.length
    ? await BaseAPI.setFieldValToExprArr(expressionsArr, field, fieldValue)
    : "";
  return res;
};

export const groupByLabel = (expressions) => {
  const groups = {};
  expressions.forEach((el) => {
    const groupId = el.labelid || "no_label";
    if (!groups[groupId]) {
      groups[groupId] = {
        labelid: groupId,
        labelname: el.label || "No Label",
        items: [],
      };
    }
    groups[groupId].items.push(el);
  });
  return Object.values(groups);
};
