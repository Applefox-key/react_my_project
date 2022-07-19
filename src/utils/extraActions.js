import BaseExtraAPI from "../API/BaseExtraAPI";

export const addContent = async (entry, cId, callback, setPopup) => {
  if (!entry.side1 || !entry.side2 || !cId) {
    setPopup([true, "please fill in both fields", "error"]);
    return;
  }
  await BaseExtraAPI.createContent(entry, cId);
  callback(await BaseExtraAPI.getContent(cId));
};
export const addContentFromFile = async (newArr, cId, callback) => {
  if (!newArr || !cId) return;
  await BaseExtraAPI.createContentFromArray(newArr, cId);
  callback(await BaseExtraAPI.getContent(cId));
};
export const contentDelete = async (content) => {
  if (!window.confirm("Delete the expression?")) return;
  await BaseExtraAPI.deleteContent(content.id);
};
export const deleteAllContent = async (cId, callback) => {
  if (!window.confirm("Delete all expressions?")) return;
  await BaseExtraAPI.deleteColContent(cId);
  callback([]);
};
