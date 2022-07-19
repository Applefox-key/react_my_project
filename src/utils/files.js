export const expressionsFromFiles = async (file, callbackForResult) => {
  if (!file) return;
  const text = await file.text();
  const contArr = text.split(/\r/).filter((item) => item.trim());
  const expressionArr = contArr.map((row) => {
    let [w, s] = row.split(";");
    return { expression: w, phrase: s };
  });

  callbackForResult(expressionArr);
};

export const contentFromFile = async (file, callbackForResult) => {
  if (!file) return;
  const text = await file.text();
  const contArr = text.split(/\r/).filter((item) => item.trim());
  const expressionArr = contArr.map((row) => {
    let [s1, s2, t] = row.split(";");
    return { side1: s1, side2: s2, tag: t };
  });

  callbackForResult(expressionArr);
};
