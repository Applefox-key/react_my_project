import BaseAPI from "./BaseAPI.js";

const BaseExtraAPI = {
  async createCollection(nameCollect, note = "") {
    let listC = await BaseAPI.fromLS("collectionsList");
    let colId = +new Date();
    listC.push({
      id: colId,
      name: nameCollect,
      note: note,
    });
    await BaseAPI.toLS("collectionsList", listC);
    return colId;
  },

  async CreatePublicCollection(note, name, content) {
    try {
      let user = BaseAPI.getUser();
      let listC = JSON.parse(localStorage.getItem("publicC"));
      let listW = JSON.parse(localStorage.getItem("publicS"));
      let colId = +new Date();
      listC.push({
        id: colId,
        name: name,
        note: note,
        user: user,
      });
      localStorage.setItem("publicC", JSON.stringify(listC));

      content.forEach((element, i) => {
        let wId = Date.now() + i;
        listW.push({
          id: wId,
          collectionid: colId,
          answer: element.answer,
          question: element.question,
          note: element.note,
        });
      });
      localStorage.setItem("publicS", JSON.stringify(listW));
      return true;
    } catch (error) {
      throw new Error(error);
    }
  },

  async createContentFromArray(arr, colId) {
    let list = await BaseAPI.fromLS("extraList");

    arr.forEach((element, i) => {
      if (!element.answer || !element.question)
        throw new Error("you cannot add an empty value ....row " + (i + 1));
      let wId = Date.now() + i;
      list.push({
        id: wId,
        collectionid: colId,
        question: element.question,
        answer: element.answer,
        note: element.note,
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
      question: content.question,
      answer: content.answer,
      note: content.note,
    });
    await BaseAPI.toLS("extraList", list);
    return wId;
  },
  async deleteColection(colId) {
    let collectionList = await BaseAPI.fromLS("collectionsList");

    let num = collectionList.findIndex(
      (item) => item.id.toString() === colId.toString()
    );
    this.deleteColContent(colId);
    collectionList.splice(num, 1);
    await BaseAPI.toLS("collectionsList", collectionList);
  },
  async deleteContent(wId) {
    let list = await BaseAPI.fromLS("extraList");
    let indbase = list.findIndex(
      (item) => item.id.toString() === wId.toString()
    );
    if (indbase !== -1) list.splice(indbase, 1);
    await BaseAPI.toLS("extraList", list);
  },
  async deleteColContent(colId) {
    let list = await BaseAPI.fromLS("extraList");
    let indbase = list.filter(
      (item) => item.collectionid.toString() !== colId.toString()
    );
    await BaseAPI.toLS("extraList", indbase);
  },
  async editColName(newName, colId) {
    let collectionList = await this.getCollectionsList();
    let num = collectionList.findIndex(
      (item) => item.id.toString() === colId.toString()
    );
    collectionList[num] = { ...collectionList[num], name: newName };
    await BaseAPI.toLS("collectionsList", collectionList);
  },
  async editContent(id, s1, s2, t) {
    if (!id) return false;
    let list = await BaseAPI.fromLS("extraList");
    let ind = list.findIndex((item) => item.id.toString() === id.toString());
    let oneEntry = list[ind];
    oneEntry.question = s1 ? s1 : oneEntry.expression;
    oneEntry.answer = s2 ? s2 : oneEntry.expression;
    oneEntry.note = t ? t : oneEntry.note;
    await BaseAPI.toLS("extraList", list);
    return true;
  },

  async getCollectionsList() {
    let allCollections = await BaseAPI.fromLS("collectionsList");
    return allCollections;
  },

  async getPublicCollectionsList() {
    let allCollections = await BaseAPI.fromLS("publicC");
    return allCollections;
  },

  async getCollections(colId) {
    var content = await BaseAPI.fromLS("extraList");
    var collect;
    let allCollections = await BaseAPI.fromLS("collectionsList");
    if (colId)
      collect = allCollections.filter(
        (item) => item.id.toString() === colId.toString()
      );
    else collect = allCollections;
    const result = collect.map((coll) => {
      const arrW = content.filter(
        (elem) => elem.collectionid.toString() === coll.id.toString()
      );
      return {
        collection: coll,
        content: arrW,
      };
    });
    return result;
  },

  async getPublicCollections(colId) {
    var cont = JSON.parse(localStorage.getItem("publicS"));
    var collect;
    if (colId)
      collect = JSON.parse(localStorage.getItem("publicC")).filter(
        (item) => item.id.toString() === colId.toString()
      );
    else collect = JSON.parse(localStorage.getItem("publicC"));

    const result = collect.map((coll) => {
      const arrW = cont.filter(
        (word) => word.collectionid.toString() === coll.id.toString()
      );
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
  async getPublicContent(colId) {
    var content = await this.getPublicCollections(colId);
    return content[0].content;
  },
  async getContentItem(id) {
    var list = await BaseAPI.fromLS("extraList");
    let ind = list.findIndex((item) => item.id.toString() === id.toString());
    let oneEntry = list[ind];

    return oneEntry;
  },
};
export default BaseExtraAPI;
// async getPublicCollectionsAll() {
//   return JSON.parse(localStorage.getItem("publicC"));
// },
// async getpublicSordsByCollection(colId) {
//   var words = JSON.parse(localStorage.getItem("publicS"));
//   if (!colId) return words;
//   words = words.filter((word) => word.collectionid == colId);
//   //  words = new WordsList(words);
//   // let words_ = words.map((item) => new Word(item));
//   return words;
// },
// async getPublicCollectionAndWords(colId) {
//   var words = JSON.parse(localStorage.getItem("publicS"));

//   var collect;
//   if (colId)
//     collect = JSON.parse(localStorage.getItem("publicC")).filter(
//       (item) => item.id == colId
//     );
//   else collect = JSON.parse(localStorage.getItem("publicC"));

//   const result = collect.map((coll) => {
//     const arrW = words.filter((word) => word.collectionid == coll.id);
//     return {
//       collection: coll,
//       words: arrW,
//     };
//   });
//   return result;
// },
