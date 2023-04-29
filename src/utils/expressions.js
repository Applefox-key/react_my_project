import BaseAPI from "../API/BaseAPI";

export const expressionState = (item) => {
  let days = item.exceededSkipsDays;
  let exceededSkipsCount = item.exceededSkipsCount;
  //  if (exceededSkipsCount) return <button className="circle bg-danger" />;
  // if (days > 0) return <button className="circle bg-warning" />;   return <></>;
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
