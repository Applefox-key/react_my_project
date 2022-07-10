export const wordsFromFiles = async (file, callbackForResult) => {
  if (!file) return;
  const text = await file.text();
  const contArr = text.split(/\r/).filter((item) => item.trim());
  const wordArr = contArr.map((row) => {
    let [w, s] = row.split(";");
    return { word: w, sentence: s };
  });
  callbackForResult(wordArr);
};
