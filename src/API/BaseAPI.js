import { Word } from "../classes/Word.js";
import dataBase from "./DataBase.js";
import * as fbHelpers from "../serverFireBaseHlp/fbHelpers";

const BaseAPI = {
  async toLS(key, value) {
    if (key != "users") {
      let user = await this.getUser();
      if (user == undefined)
        return null; //key = key.replace("List", "ListExample");
      else key = key.replace("List", "List" + user.id);
    }
    localStorage.setItem(key, JSON.stringify(value));
  },

  async fromLS(key) {
    if (key != "users") {
      let user = await this.getUser();
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
  async getCollectionsAll() {
    return await this.fromLS("collectionsList");
  },
  async getCollections() {
    let allCollections = await this.fromLS("collectionsList");
    let wordsList = await this.fromLS("wordsList");
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

  async getUser() {
    let token = JSON.parse(localStorage.getItem("token"));
    if (!token) return undefined;
    let usersList = JSON.parse(localStorage.getItem("users"));
    let user = usersList.filter((item) => item.sessions.includes(token));
    return user[0];
  },
  async getWordListAll() {
    let temp = await this.fromLS("wordsList");
    let words_ = temp.map((item) => new Word(item));
    return words_;

    // return new WordsList(this.fromLS("wordsList"));
  },

  async getWordsByCollectionAll(colId = -1) {
    if (colId == -1) return this.fromLS("wordsList");
    var words = await this.fromLS("wordsList");
    words = words.filter((word) => word.collectionid == colId);
    //  words = new WordsList(words);
    let words_ = words.map((item) => new Word(item));
    return words_;
  },
  async getCollectionAndWords(colId) {
    var words = await this.fromLS("wordsList");
    var collect;
    let allCollections = await this.fromLS("collectionsList");
    if (colId) collect = allCollections.filter((item) => item.id == colId);
    else collect = allCollections;

    const result = collect.map((coll) => {
      const arrW = words.filter((word) => word.collectionid == coll.id);
      return {
        collection: coll,
        words: arrW.map((item) => new Word(item)),
      };
    });
    return result;
  },
  async getUnreadWordsByCollection(colId = -1) {
    let temp = await this.fromLS("wordsList");

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
  async createCollection(nameCollect) {
    let listC = await this.fromLS("collectionsList");
    let colId = +new Date();
    listC.push({
      id: colId,
      name: nameCollect,
    });
    await this.toLS("collectionsList", listC);
    return colId;
  },
  async createWord(textW, textS, colId) {
    let list = await this.fromLS("wordsList");
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
    await this.toLS("wordsList", list);
    return wId;
  },
  async createWordFromArray(arr, colId) {
    let list = await this.fromLS("wordsList");
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

    await this.toLS("wordsList", list);
    return true;
  },
  async createUser(ud) {
    let login = ud.email; //document.querySelector("#loginS").value;
    let passw = ud.password; // document.querySelector("#passwordS").value;
    let name = ud.name; //document.querySelector("#nameS").value;
    let imgu = ud.imgu; //document.querySelector("#nameS").value;

    let usersList = await this.fromLS("users");
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
  async deleteColection(colId) {
    let collectionList = await this.getCollectionsAll();
    let num = collectionList.findIndex((item) => item.id == colId);
    this.deleteWordOfCollection(colId);
    collectionList.splice(num, 1);
    await this.toLS("collectionsList", collectionList);
  },

  async deleteWord(wId) {
    let wordsList = await this.fromLS("wordsList");
    let indbase = wordsList.findIndex((item) => item.id == wId);
    if (indbase != -1) wordsList.splice(indbase, 1);
    await this.toLS("wordsList", wordsList);
  },
  async deleteWordOfCollection(colId) {
    let wordsList = await this.fromLS("wordsList");
    let indbase = wordsList.filter((item) => item.collectionid != colId);
    await this.toLS("wordsList", indbase);
  },
  async renameCollection(newName, colId) {
    let collectionList = await this.getCollectionsAll();
    let num = collectionList.findIndex((item) => item.id == colId);
    collectionList[num] = { ...collectionList[num], name: newName };
    await this.toLS("collectionsList", collectionList);
  },

  async updateUser(ud) {
    let token = JSON.parse(localStorage.getItem("token"));
    if (!token) return undefined;
    let usersList = JSON.parse(localStorage.getItem("users"));
    let num = usersList.findIndex((item) => item.sessions.includes(token));
    let img = ud.imgu;

    if (img.includes("blob")) {
      console.log(ud.imgu);
      img = await fbHelpers.setImgToStorage(usersList[num].id, img);
    }

    usersList[num] = {
      ...usersList[num],
      name: ud.name,
      email: ud.email,
      password: ud.password,
      imgu: img,
    };
    await this.toLS("users", usersList);
    return true;
    // let user = usersList.filter((item) => item.sessions.includes(token));
    // return user[0];
  },
  async editWord(wordId, w, s) {
    if (!wordId) return false;
    let wordsList = await this.fromLS("wordsList");
    let ind = wordsList.findIndex((item) => item.id == wordId);
    let word = wordsList[ind];
    word.word = w;
    word.sentence = s;
    await this.toLS("wordsList", wordsList);
    return true;
  },
  async updateWord(wordId) {
    if (!wordId) return false;

    let wordsList = await this.fromLS("wordsList");

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

    await this.toLS("wordsList", wordsList);
    return true;
  },
  async login(login, passw) {
    // let login = document.querySelector('#login').value;
    // let passw = document.querySelector('#password').value;
    let usersList = await this.fromLS("users");
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
    console.log(avlist.entries());

    return avlist;
  },

  createDB() {
    if (!localStorage.getItem("collectionsList1"))
      localStorage.setItem(
        "collectionsList1",
        JSON.stringify(dataBase.collectionsList)
      );
    if (!localStorage.getItem("avatars")) {
      const avList = fbHelpers.getAvatarsFromStore();
      // localStorage.setItem("avatars", JSON.stringify(dataBase.avatars));
      // avList.then(localStorage.setItem("avatars", JSON.stringify(avList)));
    }

    if (!localStorage.getItem("wordsList1"))
      localStorage.setItem("wordsList1", JSON.stringify(dataBase.wordsList));

    if (!localStorage.getItem("publicC"))
      localStorage.setItem(
        "publicC",
        JSON.stringify(dataBase.publicCollections)
      );

    if (!localStorage.getItem("publicW"))
      localStorage.setItem("publicW", JSON.stringify(dataBase.publicWords));

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
  async getPublicCollectionsAll() {
    return JSON.parse(localStorage.getItem("publicC"));
  },
  async getPublicWordsByCollection(colId) {
    var words = JSON.parse(localStorage.getItem("publicW"));
    if (!colId) return words;
    words = words.filter((word) => word.collectionid == colId);
    //  words = new WordsList(words);
    // let words_ = words.map((item) => new Word(item));
    return words;
  },
  async getPublicCollectionAndWords(colId) {
    var words = JSON.parse(localStorage.getItem("publicW"));

    var collect;
    if (colId)
      collect = JSON.parse(localStorage.getItem("publicC")).filter(
        (item) => item.id == colId
      );
    else collect = JSON.parse(localStorage.getItem("publicC"));

    const result = collect.map((coll) => {
      const arrW = words.filter((word) => word.collectionid == coll.id);
      return {
        collection: coll,
        words: arrW,
      };
    });
    return result;
  },
  async CreatePublicCollection(lang, name, words) {
    try {
      let user = this.getUser();
      let listC = JSON.parse(localStorage.getItem("publicC"));
      let listW = JSON.parse(localStorage.getItem("publicW"));
      let colId = +new Date();
      listC.push({
        id: colId,
        name: name,
        language: lang,
        user: user,
      });
      localStorage.setItem("publicC", JSON.stringify(listC));

      words.forEach((element, i) => {
        let wId = Date.now() + i;
        listW.push({
          id: wId,
          collectionid: colId,
          word: element.word,
          sentence: element.sentence,
        });
      });
      localStorage.setItem("publicW", JSON.stringify(listW));
      return true;
    } catch (error) {
      return false;
    }
  },
};
export default BaseAPI;
