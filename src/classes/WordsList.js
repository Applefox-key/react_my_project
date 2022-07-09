import { Word } from "./Word.js";

export class WordsList {
  #sentences;
  constructor(slist) {
    this.#sentences = slist.map((item) => new Word(item));
  }
  get sentences() {
    return this.#sentences;
  }

  numberById(wordId) {
    if (!wordId) return 0;

    let ind = this.#sentences.findIndex((item) => item.id == wordId);
    return ind == -1 ? false : ind;
  }
  leftToRead() {
    // counting unread words in the sentanses array

    let a = this.#sentences.filter((item) => {
      return 1 - item.alreadyReadToday;
    });
    return a.length;
  }
}

try {
  module.exports = { WordsList };
} catch (error) {
  console.log("");
}
