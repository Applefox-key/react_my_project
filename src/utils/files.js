export const expressionsFromTxtFile = async (file, callbackForResult) => {
  if (!file) throw new Error("no file selected");
  if (file.type !== "text/plain") throw new Error("wrong file type");

  const text = await file.text();
  const contArr = text.split(/\r/).filter((item) => item.trim());
  const expressionArr = contArr.map((row) => {
    let [w, s] = row.replace("  ", " ").split(";");
    return { expression: w ? w : "", phrase: s ? s : "" };
  });

  callbackForResult(expressionArr);
};
