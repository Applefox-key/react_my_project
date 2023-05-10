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
      let [p1, p2] = row.replace(/\s+/g, " ").split(separator);
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
export const phrasessFromText = async (
  text,
  callbackForResult,
  setPopupAdvise
) => {
  if (!text) {
    setPopupAdvise("please paste: phrase ");
    return;
  }

  try {
    const contArr = text.split(/\n/).filter((item) => item.trim());
    if (!contArr) {
      setPopupAdvise("failed to recognize expressions");
      return;
    }

    const expressionArr = contArr.map((row, i) => {
      return { id: i, expression: "", phrase: row };
    });

    callbackForResult(expressionArr);
  } catch (error) {
    setPopupAdvise(error.message);
    return;
  }
};
export const addSpanToExpInPrase = (item) => {
  if (!item.expression || !item.phrase.includes(item.expression))
    return <>{item.phrase}</>;
  let phrase = item.phrase;
  let expression = item.expression;
  const regexPatternExp = expression.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
  const repT = phrase.replace(
    new RegExp(regexPatternExp, "gim"),
    "Span#%!#" + item.expression + "Span#%!#"
  );

  let arr = repT.split("Span#%!#");
  let result = (
    <>
      {arr.map((el, i) => {
        return el === item.expression ? (
          <span key={i} className="expression">
            {item.expression}
          </span>
        ) : (
          <>{el}</>
        );
      })}
    </>
  );
  return result;
};
