import { Expression } from "../classes/Expression.js";
import * as fbHelpers from "../utils/serverFireBaseHlp/fbHelpers";
import axios from "axios";

const BaseAPI = {
  async getAuthHeaders() {
    let token = JSON.parse(localStorage.getItem("tokenexpressions"));
    if (!token) throw new Error("session not found");
    return {
      "Authorization": `Bearer ${token}`,
    };
  },
  async serverReq(method, url, isHeader, data = "", params = "") {
    let axiosConfig = {
      method: method,
      url: "http://localhost:8000" + url,
      // url: "http://34.214.160.243:8000" + url,
    };
    if (params) axiosConfig.params = params;
    if (data) axiosConfig.data = { data: data };
    if (isHeader) axiosConfig.headers = await this.getAuthHeaders();

    try {
      let result = await axios(axiosConfig);
      if ((method = "get")) return result.data;
      return { status: true, message: "success" };
    } catch (error) {
      if (error.code === "ERR_NETWORK") return { error: error.message };
      return { error: error.response.data.error };
    }
  },
  async createCategory(name, isPublic = false) {
    let reqData = {
      name: name,
    };
    return await this.serverReq("post", "/categories/user", true, reqData);
  },
  async createExpression(textW, textS) {
    let reqData = { list: [{ expression: textW, phrase: textS }] };
    return await this.serverReq("post", "/expressions", true, reqData);
  },
  async createExpressionFromArray(arr) {
    arr.forEach((element, i) => {
      if (!element.expression || !element.phrase)
        throw new Error("you cannot add an empty value ....row " + (i + 1));
    });
    let reqData = { list: arr };
    return await this.serverReq("post", "/expressions", true, reqData);
  },
  async createUser(ud) {
    let reqData = {
      email: ud.email,
      password: ud.password,
      name: ud.name,
      img: ud.img,
    };

    return await this.serverReq("post", "/users", false, reqData);
  },
  async deleteCategory(catid) {
    return await this.serverReq("delete", "/categories/" + catid, true);
  },
  async deleteCategoriesAll() {
    return await this.serverReq("delete", "/categories", true);
  },
  async deleteExpression(wId) {
    return await this.serverReq("delete", "/expressions/" + wId, true);
  },
  async deleteAllExpressions() {
    return await this.serverReq("delete", "/expressions", true);
  },
  async editCategory(newParam, catId) {
    if (!newParam || !catId) return { message: "nothing has changed" };

    return await this.serverReq(
      "patch",
      "/categories/" + catId,
      true,
      newParam
    );
  },
  async editExpression(expressionN) {
    if (
      !expressionN.hasOwnProperty("expression") &&
      !expressionN.hasOwnProperty("phrase")
    )
      return { message: "nothing has changed" };

    return await this.serverReq("patch", "/expressions", true, expressionN);
  },
  async getCategoriesList(isPublic = false) {
    const result = isPublic
      ? await this.serverReq("get", "/categories/public", true)
      : await this.serverReq("get", "/categories/user", true);

    if (result.error) {
      throw new Error(result.error);
    }
    return result.data;
  },
  async getTrainingListAll() {
    let result = await this.serverReq("get", "/expressions", true);
    if (result.error) throw new Error(result.error);
    let expressions_ = result.data.map((item) => new Expression(item));
    return expressions_;
  },
  async getTrainingListOnePage(limit, page) {
    let reqParams = { page: page, limit: limit };
    let result = await this.serverReq(
      "get",
      "/expressions/page/" + page,
      true,
      "",
      reqParams
    );
    if (result.error) throw new Error(result.error);
    let expressions_ = result.data.list.map((item) => new Expression(item));
    return [expressions_, Math.ceil(result.data.total[0].total / limit)];
  },
  async getUnreadExpressions() {
    let reqParams = { offset_ms: new Date().getTimezoneOffset() * 60 * 1000 };
    let result = await this.serverReq(
      "get",
      "/expressions/unread",
      true,
      "",
      reqParams
    );
    if (result.error) throw new Error(result.error);
    let expressions_ = result.data.map((item) => new Expression(item));
    return expressions_;
  },
  async getUser() {
    let result = await this.serverReq("get", "/users", true);
    if (result.error) throw new Error(result.error);
    let usrData = { ...result.data, password: "" };
    return usrData;
  },
  async login(login, passw) {
    let reqData = {
      email: login,
      password: passw.toString(),
    };
    let result = await this.serverReq("post", "/users/login", false, reqData);
    if (result.error) throw new Error(result.error);

    let token = result.token;
    localStorage.setItem("Auth", "true");
    localStorage.setItem("tokenexpressions", JSON.stringify(token));
    return { status: true, role: result.role };
  },
  async logout() {
    let result = await this.serverReq("delete", "/users/logout", true);
    if (!result.error) {
      localStorage.setItem("Auth", "false");
      localStorage.removeItem("tokenexpressions");
    }
    return result;
  },
  async updateUser(ud) {
    let reqData = { ...ud };
    if (ud.img.includes("blob")) {
      let img = await fbHelpers.setImgToStorage(ud.id, ud.file);
      reqData = { ...ud, img: img };
    }

    return await this.serverReq("patch", "/users", true, reqData);
  },
  async updateExpression(expressionBefore) {
    if (!expressionBefore)
      return { status: false, error: "expression's not selected" };

    let expression = expressionBefore.setForUpdate;

    return await this.serverReq("patch", "/expressions", true, expression);
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
    if (!localStorage.getItem("avatars")) {
      const avList = fbHelpers.getAvatarsFromStore();
      avList.then(localStorage.setItem("avatars", JSON.stringify(avList)));
    }
  },
};
export default BaseAPI;
