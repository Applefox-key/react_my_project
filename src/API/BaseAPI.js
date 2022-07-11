import { Word } from "../classes/Word.js";
import dataBase from "./DataBase.js";

const BaseAPI = {
  toLS(key, value) {
    if (key != "users") {
      let user = this.getUser();
      if (user == undefined)
        return null; //key = key.replace("List", "ListExample");
      else key = key.replace("List", "List" + user.id);
    }
    localStorage.setItem(key, JSON.stringify(value));
  },

  fromLS(key) {
    if (key != "users") {
      let user = this.getUser();
      if (user == undefined)
        return null; //key = key.replace("List", "ListExample");
      else key = key.replace("List", "List" + user.id);
    }
    return JSON.parse(localStorage.getItem(key));
  },
  newDateFormat(dt = new Date()) {
    if (typeof dt == "string" && dt[10] == "T") dt = dt.slice(0, 10);
    let nd = new Date(dt);
    nd.setHours(0, 0, 0, 0);
    return nd;
  },
  getCollectionsAll() {
    return this.fromLS("collectionsList");
  },
  getCollections() {
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
    return allCollections;
  },

  getUser() {
    let token = JSON.parse(localStorage.getItem("token"));
    if (!token) return undefined;
    let usersList = JSON.parse(localStorage.getItem("users"));
    let user = usersList.filter((item) => item.sessions.includes(token));
    return user[0];
  },
  getWordListAll() {
    let temp = this.fromLS("wordsList");
    let words_ = temp.map((item) => new Word(item));
    return words_;

    // return new WordsList(this.fromLS("wordsList"));
  },

  getWordsByCollectionAll(colId = -1) {
    if (colId == -1) return this.fromLS("wordsList");
    var words = this.fromLS("wordsList");
    words = words.filter((word) => word.collectionid == colId);
    //  words = new WordsList(words);
    let words_ = words.map((item) => new Word(item));
    return words_;
  },

  getUnreadWordsByCollection(colId = -1) {
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
  },
  createCollection(nameCollect) {
    let listC = this.fromLS("collectionsList");
    let colId = +new Date();
    listC.push({
      id: colId,
      name: nameCollect,
    });
    this.toLS("collectionsList", listC);
    return colId;
  },
  createWord(textW, textS, colId) {
    let list = this.fromLS("wordsList");
    let wId = Date.now();
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
  },
  createWordFromArray(arr, colId) {
    let list = this.fromLS("wordsList");
    arr.forEach((element, i) => {
      let wId = Date.now() + i;
      list.push({
        id: wId,
        collectionid: colId,
        stage: 0,
        word: element.word,
        sentence: element.sentence,
        nextDate: new Date(),
        history: [{ action: "add", date: new Date() }],
      });
    });

    this.toLS("wordsList", list);
    return true;
  },
  createUser(ud) {
    let login = ud.email; //document.querySelector("#loginS").value;
    let passw = ud.password; // document.querySelector("#passwordS").value;
    let name = ud.name; //document.querySelector("#nameS").value;
    let imgu = ud.imgu; //document.querySelector("#nameS").value;

    let usersList = this.fromLS("users");
    let user = usersList.find((item) => item.email == login);

    if (user !== undefined)
      return { status: false, error: "user already exist" };
    let uId = Date.now();
    localStorage.setItem("wordsList" + uId, JSON.stringify([]));
    localStorage.setItem("collectionsList" + uId, JSON.stringify([]));
    let newUser = {
      id: uId,
      name: name,
      email: login,
      password: passw,
      sessions: [],
      imgu: imgu,
    };

    let token = Date.now();
    newUser.sessions.push(token);
    usersList.push(newUser);
    localStorage.setItem("users", JSON.stringify(usersList));
    localStorage.setItem("token", JSON.stringify(token));
    return {
      status: true,
    };
  },
  deleteColection(colId) {
    let collectionList = this.getCollectionsAll();
    let num = collectionList.findIndex((item) => item.id == colId);
    this.deleteWordOfCollection(colId);
    collectionList.splice(num, 1);
    this.toLS("collectionsList", collectionList);
  },

  deleteWord(wId) {
    let wordsList = this.fromLS("wordsList");
    let indbase = wordsList.findIndex((item) => item.id == wId);
    if (indbase != -1) wordsList.splice(indbase, 1);
    this.toLS("wordsList", wordsList);
  },
  deleteWordOfCollection(colId) {
    let wordsList = this.fromLS("wordsList");
    let indbase = wordsList.filter((item) => item.collectionid != colId);
    this.toLS("wordsList", indbase);
  },
  renameCollection(newName, colId) {
    let collectionList = this.getCollectionsAll();
    let num = collectionList.findIndex((item) => item.id == colId);
    collectionList[num] = { ...collectionList[num], name: newName };
    this.toLS("collectionsList", collectionList);
  },
  updateUser(ud) {
    let token = JSON.parse(localStorage.getItem("token"));
    if (!token) return undefined;
    let usersList = JSON.parse(localStorage.getItem("users"));
    let num = usersList.findIndex((item) => item.sessions.includes(token));
    usersList[num] = {
      ...usersList[num],
      name: ud.name,
      email: ud.email,
      password: ud.password,
      imgu: ud.imgu,
    };
    this.toLS("users", usersList);
    return true;
    // let user = usersList.filter((item) => item.sessions.includes(token));
    // return user[0];
  },
  editWord(wordId, w, s) {
    if (!wordId) return false;
    let wordsList = this.fromLS("wordsList");
    let ind = wordsList.findIndex((item) => item.id == wordId);
    let word = wordsList[ind];
    word.word = w;
    word.sentence = s;
    this.toLS("wordsList", wordsList);
    return true;
  },
  updateWord(wordId) {
    if (!wordId) return false;

    let wordsList = this.fromLS("wordsList");

    let ind = wordsList.findIndex((item) => item.id == wordId);
    let word = wordsList[ind];
    // let wordObj = new WordsList([word]);
    let wordObj = new Word(word);

    let wordNextDate = this.newDateFormat(word.nextDate);
    if (!word.started) wordNextDate = this.newDateFormat();
    let todayDate = this.newDateFormat();

    if (wordObj.exceededSkipsCount) {
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
  },
  login(login, passw) {
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
  },
  logout() {
    localStorage.removeItem("token");
  },
  getAvatarUrl(num) {
    const avlist = JSON.parse(localStorage.getItem("avatars"));
    if (num > avlist.length()) return "";
    return avlist[num];
  },
  getAvatarUrlList(num) {
    const avlist = JSON.parse(localStorage.getItem("avatars"));
    return avlist;
  },

  createDB() {
    if (!localStorage.getItem("collectionsList1"))
      localStorage.setItem(
        "collectionsList1",
        JSON.stringify(dataBase.collectionsList)
      );
    if (!localStorage.getItem("avatars"))
      localStorage.setItem("avatars", JSON.stringify(dataBase.avatars));

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
  },
  deleteDB() {
    localStorage.removeItem("collectionsList1");
    localStorage.removeItem("wordsList1");
    localStorage.removeItem("collectionsListExample");
    localStorage.removeItem("wordsListExample");
    localStorage.removeItem("users");
    localStorage.removeItem("user");
    console.log("DB DEL OK");
  },
};
export default BaseAPI;
