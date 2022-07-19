export const expressionsCounter = (expressionsArr) => {
  return expressionsArr.reduce((count, expression) => {
    if (!expression.alreadyReadToday) count += 1;
    return count;
  }, 0);
};
