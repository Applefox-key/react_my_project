export const getSettings = () => {
  const currentSet = localStorage.getItem("sett");
  if (currentSet) return parseInt(currentSet);
  return false;
};

export const setSettings = (set = "") => {
  localStorage.setItem("sett", set);
};
