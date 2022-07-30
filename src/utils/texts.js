export const expressionsFromText = async (
  text,
  callbackForResult,
  setPopupSettings,
  separator = ";"
) => {
  if (!text) {
    setPopupSettings([true, "please paste:  expression; phrase ", "attantion"]);
    return;
  }

  try {
    const contArr = text.split(/\n/).filter((item) => item.trim());
    if (!contArr) {
      setPopupSettings([true, "failed to recognize expressions", "attantion"]);
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
    setPopupSettings([true, error.message, "attantion"]);
    return;
  }
};

export const contentFromText = async (
  text,
  callbackForResult,
  setPopupSettings,
  auto = true,
  separator = ";"
) => {
  if (!text) {
    setPopupSettings([
      true,
      "please paste:  question ; answer ; note ",
      "attantion",
    ]);
    return;
  }

  try {
    const contArr = text.split(/\n/).filter((item) => item.trim());
    if (!contArr) {
      setPopupSettings([true, "failed to recognize content", "attantion"]);
      return;
    }
    const contentArr = contArr.map((row, i) => {
      let arr = row
        .replace("  ", " ")
        .split(separator)
        .filter((el) => el);
      if (auto) {
        //automatically determine the column name
        arr.sort((a, b) => a.length - b.length); //q n a
        if (arr.length === 2) arr.splice(1, 0, "");
        return { id: i, question: arr[0], answer: arr[2], note: arr[1] };
      } else {
        return { id: i, question: arr[0], answer: arr[1], note: arr[2] };
      }
    });
    callbackForResult(contentArr);
  } catch (error) {
    setPopupSettings([true, error.message, "attantion"]);
    return;
  }
};
