export const expressionsFromText = async (
  text,
  callbackForResult,
  setPopupAdvise,
  separator = ";"
) => {
  if (!text) {
    setPopupAdvise("please paste:  expression; phrase ");
    return;
  }

  try {
    const contArr = text.split(/\n/).filter((item) => item.trim());
    if (!contArr) {
      setPopupAdvise("failed to recognize expressions");
      return;
    }

    const expressionArr = contArr.map((row, i) => {
      let [p1, p2] = row.replace("  ", " ").split(separator);
      if (!p1 || !p2) return { id: i, expression: p1, phrase: p2 };
      if (p1.length > p2.length) return { id: i, expression: p2, phrase: p1 };
      else return { id: i, expression: p1, phrase: p2 };
    });

    callbackForResult(expressionArr);
  } catch (error) {
    setPopupAdvise(error.message);
    return;
  }
};
