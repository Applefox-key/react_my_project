import BaseAPI from "../API/BaseAPI";

export const addExpression = async (newExp, callback, setPopupSettings) => {
  if (!newExp.expression || !newExp.phrase) {
    setPopupSettings([true, "please fill in both fields", "error"]);
    return;
  }
  await BaseAPI.createExpression(newExp.expression, newExp.phrase);
  callback(await BaseAPI.getTrainingListAll());
};

export const addExpressionsFromFile = async (newExpressionArr, callback) => {
  if (!newExpressionArr) return;
  await BaseAPI.createExpressionFromArray(newExpressionArr);
  callback(await BaseAPI.getTrainingListAll());
};

export const expressionDelete = async (expression, expressions, callback) => {
  if (!window.confirm("Delete the expression?")) return;
  await BaseAPI.deleteExpression(expression.id);
  let arr = expressions.filter((elem) => elem.id !== expression.id);
  callback(arr);
};

export const deleteAllExpressions = async (callback) => {
  if (!window.confirm("Delete all expressions?")) return;
  await BaseAPI.deleteAllExpressions();
  callback([]);
};
