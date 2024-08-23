export const expressionsFromTxtFile = async (file, callbackForResult) => {
  if (!file) throw new Error("no file selected");
  if (file.type !== "text/plain") throw new Error("wrong file type");
  const text = await file.text();
  const contArr = text.split(/\r?\n/).filter((item) => item.trim());
  const expressionArr = contArr.map((row) => {
    let [w, s, n] = row.replace("  ", " ").split(";");
    return { expression: w ? w : "", phrase: s ? s : "", note: n ? n : "" };
  });

  callbackForResult(expressionArr);
};

const valueOrEmpty = (val) => (val ? val + ";" : "");

export const createFilesData = (list) => {
  const content = list
    .map(
      (el) =>
        valueOrEmpty(el.expression) +
        valueOrEmpty(el.phrase) +
        valueOrEmpty(el.note)
    )
    .join("\r");

  const data = new Blob([content], { type: "text/plain" });
  return data;
};
