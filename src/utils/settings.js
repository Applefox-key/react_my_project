import BaseAPI from "../API/BaseAPI";

export const getSettings = (name, defaultVal = null) => {
  const currentSetStr = localStorage.getItem("phrase_options");
  let currentSet = currentSetStr ? JSON.parse(currentSetStr) : {};
  if (currentSet.hasOwnProperty(name)) return currentSet[name];
  return defaultVal;
};

export const setSettings = (name, set = "") => {
  const currentSetStr = localStorage.getItem("phrase_options");
  let currentSet = currentSetStr ? JSON.parse(currentSetStr) : {};
  currentSet[name] = set;
  localStorage.setItem("phrase_options", JSON.stringify(currentSet));
};

export const saveUserTheme = async (newThemeSet, setPopup, auth) => {
  const setUserAuth = auth[2];
  const userData = await BaseAPI.getUser();
  const oldSet = JSON.parse(userData.settings);
  const newSettings = {
    ...oldSet,
    theme: { ...oldSet.theme, ...newThemeSet },
  };
  let result = await BaseAPI.updateUser({
    ...userData,
    settings: newSettings,
  });
  if (result.error) {
    setPopup.error(result.error);
    return;
  }
  setUserAuth({
    ...auth[1],

    set: newSettings.theme,
  });
  setPopup.success("The changes have been saved");
};
