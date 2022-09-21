// export const expressionsFromFiles = async (file, callbackForResult) => {
//   if (!file) return;
//   const text = await file.text();
//   const contArr = text.split(/\r/).filter((item) => item.trim());
//   const expressionArr = contArr.map((row) => {
//     let [w, s] = row.split(";");
//     return { expression: w, phrase: s };
//   });

//   callbackForResult(expressionArr);
// };

// export const contentFromFile = async (file, callbackForResult) => {
//   if (!file) return;
//   const text = await file.text();
//   const contArr = text.split(/\r/).filter((item) => item.trim());
//   const expressionArr = contArr.map((row) => {
//     let [s1, s2, t] = row.split(";");
//     return { question: s1, answer: s2, note: t };
//   });

//   callbackForResult(expressionArr);
// };

export const contentFromTxtFile = async (file, callbackForResult) => {
  if (!file) throw new Error("no file selected");
  if (file.type !== "text/plain") throw new Error("wrong file type");
  const text = await file.text();
  const contArr = text.split(/\r/).filter((item) => item.trim());
  const expressionArr = contArr.map((row) => {
    let [s1, s2, t] = row.replace("  ", " ").split(";");
    return { question: s1, answer: s2, note: t };
  });

  callbackForResult(expressionArr);
};

export const expressionsFromTxtFile = async (file, callbackForResult) => {
  debugger;
  if (!file) throw new Error("no file selected");
  if (file.type !== "text/plain") throw new Error("wrong file type");

  const text = await file.text();
  const contArr = text.split(/\r/).filter((item) => item.trim());
  const expressionArr = contArr.map((row) => {
    let [w, s] = row.replace("  ", " ").split(";");
    return { expression: w, phrase: s };
  });

  callbackForResult(expressionArr);
};
