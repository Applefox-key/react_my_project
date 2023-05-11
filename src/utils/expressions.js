import BaseAPI from "../API/BaseAPI";
import { IoWarningOutline } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";

export const expressionStateIcon = (item) => {
  let days = item.exceededSkipsDays;
  let exceededSkipsCount = item.exceededSkipsCount;
  let result = <></>;
  if (exceededSkipsCount)
    result = (
      <span>
        <RiErrorWarningLine /> <IoWarningOutline />
      </span>
    );

  if (days > 0)
    result = (
      <span>
        <RiErrorWarningLine />
      </span>
    );
  return result;
};
export const expressionState = (item) => {
  let days = item.exceededSkipsDays;
  let exceededSkipsCount = item.exceededSkipsCount;
  let color = "colorBlue";
  if (exceededSkipsCount) color = "colorRed";
  if (days > 0) color = "colorOrange";
  return color;
};

export const deleteExpressions = async (expression = "") => {
  let res;
  if (expression) {
    if (!window.confirm("Delete the expression?")) return false;
    res = await BaseAPI.deleteExpression(expression.id);
  } else {
    if (!window.confirm("Delete all expressions?")) return false;
    res = await BaseAPI.deleteAllExpressions();
  }
  return res;
};

export const setLabelToArr = async (expressionsArr, labelid) => {
  let res = expressionsArr.length
    ? await BaseAPI.setLabelToExprArr(expressionsArr, labelid)
    : "";
  return res;
};
