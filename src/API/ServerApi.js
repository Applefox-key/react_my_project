import { WordsList } from "../classes/WordsList.js";
import { Word } from "../classes/Word.js";
import { CollectionList } from "../classes/CollectionList.js";
import dataBase from "./DataBase.js";

export default class ServerApi {
  static toLS(key, value) {
    if (key != "users") {
      let user = this.getUser();
      if (user == undefined)
        return null; //key = key.replace("List", "ListExample");
      else key = key.replace("List", "List" + user.id);
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  static fromLS(key) {
    if (key != "users") {
      let user = this.getUser();
      if (user == undefined)
        return null; //key = key.replace("List", "ListExample");
      else key = key.replace("List", "List" + user.id);
    }
    return JSON.parse(localStorage.getItem(key));
  }

  static newDateFormat(dt = new Date()) {
    if (typeof dt == "string" && dt[10] == "T") dt = dt.slice(0, 10);
    let nd = new Date(dt);
    nd.setHours(0, 0, 0, 0);
    return nd;
  }
  static async getCollectionsAll() {
    let result = await this.fromLS("collectionsList");
    // return new CollectionList(this.fromLS("collectionsList"));
    return result;
  }

  static async getCollections() {
    let allCollections = this.fromLS("collectionsList");
    let wordsList = this.fromLS("wordsList");
    let numb = wordsList.reduce(
      (numb, item) => {
        let dayToday = this.newDateFormat();
        let nextDay = this.newDateFormat(item.nextDate);
        let lastAct = this.newDateFormat(
          item.history[item.history.length - 1].date
        );
        if (nextDay <= dayToday || lastAct - dayToday == 0)
          numb[0].push(item.collectionid);
        numb[1].push(item.collectionid);
        return numb;
      },
      [[], []]
    );
    allCollections = allCollections.filter(
      (item) => numb[0].includes(item.id) || !numb[1].includes(item.id)
    );
    return new CollectionList(allCollections);
  }

  static async getUser() {
    let token = JSON.parse(localStorage.getItem("token"));
    if (!token) return undefined;
    let usersList = JSON.parse(localStorage.getItem("users"));
    let user = usersList.filter((item) => item.sessions.includes(token));
    return user[0];
  }
  static async getWordListAll() {
    return this.fromLS("wordsList");
    // return new WordsList(this.fromLS("wordsList"));
  }

  static async getWordsByCollectionAll(colId = -1) {
    if (colId == -1) return this.fromLS("wordsList");
    console.log(colId);
    var words = this.fromLS("wordsList");
    words = words.filter((word) => word.collectionid == colId);
    //  words = new WordsList(words);
    return words;
  }

  static async getUnreadWordsByCollection(colId = -1) {
    let temp = this.fromLS("wordsList");

    let wordList = temp.filter((item) => {
      if (colId != -1 && item.collectionid != colId) return false;
      let dayToday = this.newDateFormat();
      let nextDay = this.newDateFormat(item.nextDate);
      return nextDay <= dayToday;
    });
    // let words = new WordsList(wordList);

    let words = wordList.map((item) => new Word(item));
    return words;
  }
  static async createCollection(nameCollect) {
    let listC = this.fromLS("collectionsList");
    let colId = +new Date();
    listC.push({
      id: colId,
      name: nameCollect,
    });
    this.toLS("collectionsList", listC);
    return colId;
  }
  static async createWord(textW, textS, colId) {
    let list = this.fromLS("wordsList");
    let wId = +new Date();
    list.push({
      id: wId,
      collectionid: colId,
      stage: 0,
      word: textW,
      sentence: textS,
      nextDate: new Date(),
      history: [{ action: "add", date: new Date() }],
    });
    this.toLS("wordsList", list);
    return wId;
  }
  static async createUser() {
    let login = document.querySelector("#loginS").value;
    let passw = document.querySelector("#passwordS").value;
    let name = document.querySelector("#nameS").value;

    let usersList = this.fromLS("users");
    let user = usersList.find((item) => item.email == login);

    if (user !== undefined)
      return { status: false, error: "user already exist" };
    let uId = +new Date();
    localStorage.setItem("wordsList" + uId, JSON.stringify([]));
    localStorage.setItem("collectionsList" + uId, JSON.stringify([]));
    let newUser = {
      id: uId,
      name: name,
      email: login,
      password: passw,
      sessions: [],
    };

    let token = +new Date();
    newUser.sessions.push(token);
    usersList.push(newUser);
    localStorage.setItem("users", JSON.stringify(usersList));
    localStorage.setItem("token", JSON.stringify(token));
    return {
      status: true,
    };
  }
  static async deleteColection(colId) {
    let collectionList = this.getCollectionsAll();
    let num = collectionList.numberById(colId);
    let temp = this.fromLS("wordsList");

    let wordsList = temp.filter((item) => item.collectionid != colId);

    collectionList.collections.splice(num, 1);

    this.toLS("collectionsList", collectionList.collections);
    this.toLS("wordsList", wordsList);
  }
  static async deleteWord(wId) {
    let wordsList = this.fromLS("wordsList");
    let indbase = wordsList.findIndex((item) => item.id == wId);
    if (indbase != -1) wordsList.splice(indbase, 1);
    this.toLS("wordsList", wordsList);
  }
  static async updateWord(wordId) {
    if (!wordId) return false;

    let wordsList = this.fromLS("wordsList");

    let ind = wordsList.findIndex((item) => item.id == wordId);
    let word = wordsList[ind];
    let wordObj = new WordsList([word]);

    let wordNextDate = this.newDateFormat(word.nextDate);
    if (!word.started) wordNextDate = this.newDateFormat();
    let todayDate = this.newDateFormat();

    if (wordObj.sentences[0].exceededSkipsCount) {
      //reset progress
      word.stage = 0;
      word.nextDate = todayDate;
      wordNextDate = this.newDateFormat();
      word.history.push({ action: "new try", date: new Date() });
    }

    let act = todayDate - wordNextDate == 0 ? "read by the plan" : "read late";

    if (word.history == undefined) {
      word.history = [];
      word.history.push({ action: "add", date: new Date() });
    }

    word.history.push({ action: act, date: new Date() });

    if (word.stage < 6) {
      wordNextDate.setDate(wordNextDate.getDate() + 2);
      // dt += oneDayinMs;
    } else if (word.stage < 7) {
      wordNextDate.setDate(wordNextDate.getDate() + 8);
      //dt += 7*oneDayinMs;
    } else {
      wordNextDate.setDate(wordNextDate.getDate() + 15);
      //dt = this.newDateFormat(dt + 14*oneDayinMs);
    }
    word.nextDate = wordNextDate; //this.newDateFormat(wordNextDate);
    ++word.stage;

    this.toLS("wordsList", wordsList);
    return true;
  }
  static async login(login, passw) {
    // let login = document.querySelector('#login').value;
    // let passw = document.querySelector('#password').value;
    let usersList = this.fromLS("users");
    let userInd = usersList.findIndex((item) => item.email == login);
    let user = usersList[userInd];
    if (user == undefined) return { status: false, error: "user is not find" };
    if (user.password != passw)
      return { status: false, error: "wrong password" };
    let token = +new Date();
    usersList[userInd].sessions.push(token);
    localStorage.setItem("users", JSON.stringify(usersList));
    localStorage.setItem("token", JSON.stringify(token));
    return {
      status: true,
    };

    // let url ='http://localhost:3000/';
    // let response = await fetch(url, {
    //     method: 'POST',
    //     body: new FormData(document.querySelector('#loginForm'))
    //   });

    //   let result = await response.json();

    //   alert(result.message);
  }
  static async logout() {
    localStorage.removeItem("token");
  }
  static async createDB() {
    if (!localStorage.getItem("collectionsList1"))
      localStorage.setItem(
        "collectionsList1",
        JSON.stringify(dataBase.collectionsList)
      );

    if (!localStorage.getItem("wordsList1"))
      localStorage.setItem("wordsList1", JSON.stringify(dataBase.wordsList));

    if (!localStorage.getItem("collectionsListExample"))
      localStorage.setItem(
        "collectionsListExample",
        JSON.stringify(dataBase.collectionsListExample)
      );

    if (!localStorage.getItem("wordsListExample"))
      localStorage.setItem(
        "wordsListExample",
        JSON.stringify(dataBase.wordsListExample)
      );

    if (!localStorage.getItem("users"))
      localStorage.setItem("users", JSON.stringify(dataBase.users));

    if (!localStorage.getItem("user"))
      localStorage.setItem("user", JSON.stringify(dataBase.user));
    console.log("DB OK");
  }
  static async deleteDB() {
    localStorage.removeItem("collectionsList1");
    localStorage.removeItem("wordsList1");
    localStorage.removeItem("collectionsListExample");
    localStorage.removeItem("wordsListExample");
    localStorage.removeItem("users");
    localStorage.removeItem("user");
    console.log("DB DEL OK");
  }
}
