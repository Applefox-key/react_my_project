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
  const repT = item.phrase.replace(
    new RegExp(item.expression, "gim"),
    "Spanitemexpression"
  );
  let arr = repT.split("Spanitemexpression");

  let res = (
    <>
      {" "}
      {arr[0]}
      <span className="expression">{item.expression}</span>
      {arr[1]}
    </>
  );
  return res;
  // let res = [""];
  // let arr = repT.split(" ");
  // arr.forEach((element, i) => {
  //   // if (element === "Spanitemexpression") {
  //   if (element.includes("Spanitemexpression")) {
  //     res.push(
  //       <span className="expression">
  //         {element.replace("Spanitemexpression", " " + item.expression.trim())}
  //       </span>
  //     );
  //     if (arr.length - 1 !== i) res.push("");
  //   } else res[res.length - 1] += " " + element;
  // });

  // return <>{res.map((row, i) => row)}</>;
};
