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
