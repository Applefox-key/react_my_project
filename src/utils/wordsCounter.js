export const wordsCounter = (wordsArr) => {
  return wordsArr.reduce((count, word) => {
    if (!word.alreadyReadToday) count += 1;
    return count;
  }, 0);
};
