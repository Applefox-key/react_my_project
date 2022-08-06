import { Expression } from "../classes/Expression.js";
import dataBase from "./DataBase.js";
import * as fbHelpers from "../serverFireBaseHlp/fbHelpers";

const BaseAPI = {
  async toLS(key, value) {
    if (key !== "users") {
      let user = await this.getUser();
      if (user === undefined)
        return null; //key = key.replace("List", "ListExample");
      else key = key.replace("List", "List" + user.id);
    }
    localStorage.setItem(key, JSON.stringify(value));
  },
  async fromLS(key) {
    if (key !== "users") {
      let user = await this.getUser();
      if (user === undefined)
        return null; //key = key.replace("List", "ListExample");
      else key = key.replace("List", "List" + user.id);
    }

    return JSON.parse(localStorage.getItem(key));
  },
  newDateFormat(dt = new Date()) {
    if (typeof dt == "string" && dt[10] === "T") dt = dt.slice(0, 10);
    let nd = new Date(dt);
    nd.setHours(0, 0, 0, 0);
    return nd;
  },

  async getUser() {
    let token = JSON.parse(localStorage.getItem("token"));
    if (!token) return undefined;
    let usersList = JSON.parse(localStorage.getItem("users"));
    let user = usersList.filter((item) => item.sessions.includes(token));
    return user[0];
  },
  async getTrainingListAll() {
    let temp = await this.fromLS("expressionsList");
    let expressions_ = temp.map((item) => new Expression(item));
    return expressions_;
  },
  async getUnreadExpressions() {
    let temp = await this.fromLS("expressionsList");

    let trainingList = temp.filter((item) => {
      let dayToday = this.newDateFormat();
      let nextDay = this.newDateFormat(item.nextDate);
      return nextDay <= dayToday;
    });
    // let expressions = new ExpressionsList(trainingList);

    let expressions = trainingList.map((item) => new Expression(item));
    return expressions;
  },
  async createExpression(textW, textS) {
    let list = await this.fromLS("expressionsList");
    let wId = Date.now();
    list.push({
      id: wId,
      stage: 0,
      expression: textW,
      phrase: textS,
      nextDate: new Date(),
      history: [{ action: "add", date: new Date() }],
    });
    await this.toLS("expressionsList", list);
    return wId;
  },
  async createExpressionFromArray(arr) {
    let list = await this.fromLS("expressionsList");
    arr.forEach((element, i) => {
      if (!element.expression || !element.phrase)
        throw new Error("you cannot add an empty value ....row " + (i + 1));
      let wId = Date.now() + i;
      list.push({
        id: wId,
        stage: 0,
        expression: element.expression,
        phrase: element.phrase,
        nextDate: new Date(),
        history: [{ action: "add", date: new Date() }],
      });
    });
    await this.toLS("expressionsList", list);
    return true;
  },
  async createUser(ud) {
    let login = ud.email;
    let passw = ud.password;
    let name = ud.name;
    let imgu = ud.imgu;

    let usersList = await this.fromLS("users");
    let user = usersList.find((item) => item.email.trim() === login.trim());

    if (user !== undefined)
      return { status: false, error: "user already exist" };
    let uId = Date.now();
    localStorage.setItem("expressionsList" + uId, JSON.stringify([]));
    localStorage.setItem("collectionsList" + uId, JSON.stringify([]));
    localStorage.setItem("extraList" + uId, JSON.stringify([]));
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
  async deleteExpression(wId) {
    let expressionsList = await this.fromLS("expressionsList");
    let indbase = expressionsList.findIndex(
      (item) => item.id.toString() === wId.toString()
    );
    if (indbase !== -1) expressionsList.splice(indbase, 1);
    await this.toLS("expressionsList", expressionsList);
  },
  async deleteAllExpressions() {
    await this.toLS("expressionsList", []);
  },
  async editExpression(expressionId, w = "", s = "") {
    if (!expressionId) return false;
    let expressionsList = await this.fromLS("expressionsList");

    let ind = expressionsList.findIndex(
      (item) => item.id.toString() === expressionId.toString()
    );
    let expression = expressionsList[ind];
    if (w) expression.expression = w;
    if (s) expression.phrase = s;
    await this.toLS("expressionsList", expressionsList);
    return true;
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
  async updateExpression(expressionId) {
    if (!expressionId) return false;

    let expressionsList = await this.fromLS("expressionsList");
    let ind = expressionsList.findIndex(
      (item) => item.id.toString() === expressionId.toString()
    );
    let expression = expressionsList[ind];
    // let expressionObj = new ExpressionsList([expression]);
    let expressionObj = new Expression(expression);

    let expressionNextDate = this.newDateFormat(expression.nextDate);
    if (!expression.started) expressionNextDate = this.newDateFormat();
    let todayDate = this.newDateFormat();

    if (expressionObj.exceededSkipsCount) {
      //reset progress
      expression.stage = 0;
      expression.nextDate = todayDate;
      expressionNextDate = this.newDateFormat();
      expression.history.push({ action: "new try", date: new Date() });
    }

    let act =
      todayDate - expressionNextDate === 0 ? "read by the plan" : "read late";

    if (expression.history === undefined) {
      expression.history = [];
      expression.history.push({ action: "add", date: new Date() });
    }

    expression.history.push({ action: act, date: new Date() });

    if (expression.stage < 6) {
      expressionNextDate.setDate(expressionNextDate.getDate() + 2);
      // dt += oneDayinMs;
    } else if (expression.stage < 7) {
      expressionNextDate.setDate(expressionNextDate.getDate() + 8);
      //dt += 7*oneDayinMs;
    } else {
      expressionNextDate.setDate(expressionNextDate.getDate() + 15);
      //dt = this.newDateFormat(dt + 14*oneDayinMs);
    }
    expression.nextDate = expressionNextDate; //this.newDateFormat(expressionNextDate);
    ++expression.stage;

    await this.toLS("expressionsList", expressionsList);
    return true;
  },
  async login(login, passw) {
    let usersList = await this.fromLS("users");
    let userInd = usersList.findIndex(
      (item) => item.email.trim() === login.trim()
    );
    let user = usersList[userInd];
    if (user === undefined) return { status: false, error: "user is not find" };
    if (user.password !== passw)
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
    localStorage.removeItem("publicC");
    localStorage.removeItem("publicS");
    if (!localStorage.getItem("expressionsList1"))
      localStorage.setItem(
        "expressionsList1",
        JSON.stringify(dataBase.expressionsList)
      );

    if (!localStorage.getItem("publicC"))
      localStorage.setItem(
        "publicC",
        JSON.stringify(dataBase.publicCollections)
      );

    if (!localStorage.getItem("publicS"))
      localStorage.setItem("publicS", JSON.stringify(dataBase.publicContent));

    if (!localStorage.getItem("avatars")) {
      const avList = fbHelpers.getAvatarsFromStore();
      localStorage.setItem("avatars", JSON.stringify(dataBase.avatars));
      avList.then(localStorage.setItem("avatars", JSON.stringify(avList)));
    }
    if (!localStorage.getItem("users"))
      localStorage.setItem("users", JSON.stringify(dataBase.users));

    if (!localStorage.getItem("user"))
      localStorage.setItem("user", JSON.stringify(dataBase.user));
    if (!localStorage.getItem("extraList1"))
      localStorage.setItem("extraList1", JSON.stringify(dataBase.extraList));

    if (!localStorage.getItem("collectionsList1"))
      localStorage.setItem(
        "collectionsList1",
        JSON.stringify(dataBase.collectionsList)
      );
    console.log("DB OK");
  },
  deleteDB() {
    localStorage.removeItem("collectionsList1");
    localStorage.removeItem("expressionsList1");

    localStorage.removeItem("users");
    // localStorage.removeItem("user");
    localStorage.removeItem("publicC");
    localStorage.removeItem("publicS");
    console.log("DB DEL OK");
  },
};
export default BaseAPI;
