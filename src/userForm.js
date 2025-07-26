export const userRequestData = (userData) => {
  let formData = new FormData();
  if (userData.file instanceof File) {
    formData.append("file", userData.file);
  }
  Object.keys(userData).forEach((key) => {
    if (key === "file") return;
    else if (key === "settings") {
      const settingsValue =
        typeof userData[key] === "string"
          ? userData[key]
          : JSON.stringify(userData[key]);
      formData.append(`data[${key}]`, settingsValue);
    } else {
      formData.append(`data[${key}]`, userData[key]);
    }
  });

  return formData;
};
