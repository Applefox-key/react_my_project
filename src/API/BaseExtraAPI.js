import BaseAPI from "./BaseAPI.js";

const BaseExtraAPI = {
  async createCollection(nameCollect, tag = "") {
    let listC = await BaseAPI.fromLS("collectionsList");
    let colId = +new Date();
    listC.push({
      id: colId,
      name: nameCollect,
      tag: tag,
    });
    await BaseAPI.toLS("collectionsList", listC);
    return colId;
  },
  async createContentFromArray(arr, colId) {
    let list = await BaseAPI.fromLS("extraList");

    arr.forEach((element, i) => {
      let wId = Date.now() + i;
      list.push({
        id: wId,
        collectionid: colId,
        side1: element.side1,
        side2: element.side2,
        tag: element.tag,
      });
    });

    await BaseAPI.toLS("extraList", list);
    return true;
  },
  async createContent(content, colId) {
    let list = await BaseAPI.fromLS("extraList");
    let wId = Date.now();
    list.push({
      id: wId,
      collectionid: colId,
      side1: content.side1,
      side2: content.side2,
      tag: content.tag,
    });
    await BaseAPI.toLS("extraList", list);
    return wId;
  },
  async deleteColection(colId) {
    let collectionList = await BaseAPI.fromLS("collectionsList");
    let num = collectionList.findIndex((item) => item.id == colId);
    this.deleteColContent(colId);
    collectionList.splice(num, 1);
    await BaseAPI.toLS("collectionsList", collectionList);
  },
  async deleteContent(wId) {
    let list = await BaseAPI.fromLS("extraList");
    let indbase = list.findIndex((item) => item.id == wId);
    if (indbase != -1) list.splice(indbase, 1);
    await BaseAPI.toLS("extraList", list);
  },
  async deleteColContent(colId) {
    let list = await BaseAPI.fromLS("extraList");
    let indbase = list.filter((item) => item.collectionid != colId);
    await BaseAPI.toLS("extraList", indbase);
  },
  async editColName(newName, colId) {
    let collectionList = await this.getCollectionsList();
    let num = collectionList.findIndex((item) => item.id == colId);
    collectionList[num] = { ...collectionList[num], name: newName };
    await BaseAPI.toLS("collectionsList", collectionList);
  },
  async editContent(id, s1, s2, t) {
    if (!id) return false;
    let list = await BaseAPI.fromLS("extraList");
    let ind = list.findIndex((item) => item.id == id);
    let oneEntry = list[ind];
    oneEntry.side1 = s1 ? s1 : oneEntry.expression;
    oneEntry.side2 = s2 ? s2 : oneEntry.expression;
    oneEntry.tag = t ? t : oneEntry.tag;
    await BaseAPI.toLS("extraList", list);
    return true;
  },

  async getCollectionsList() {
    let allCollections = await BaseAPI.fromLS("collectionsList");
    return allCollections;
  },
  async getCollections(colId) {
    var content = await BaseAPI.fromLS("extraList");
    var collect;
    let allCollections = await BaseAPI.fromLS("collectionsList");
    if (colId) collect = allCollections.filter((item) => item.id == colId);
    else collect = allCollections;

    const result = collect.map((coll) => {
      const arrW = content.filter((elem) => elem.collectionid == coll.id);
      return {
        collection: coll,
        content: arrW,
      };
    });
    return result;
  },
  async getContent(colId) {
    var content = await this.getCollections(colId);
    return content[0].content;
  },
  async getContentItem(id) {
    var list = await BaseAPI.fromLS("extraList");
    let ind = list.findIndex((item) => item.id == id);
    let oneEntry = list[ind];

    return oneEntry;
  },
};
export default BaseExtraAPI;
