export const themeArr = {
  blue: {
    "--background-color-base": "white",
    "--background-color-dark": "#6a99db",
    "--background-color-medium": "#d7e5fa",
    "--background-color-light": "ghostwhite",
    "--background-color-intense": "#286CCB",
    "--background-color-pale": "aliceblue",
    "--color-marker": "#0d6af5",
    "--color-text-label": "white",
    "--color-text-inform": "lightblue",
    "--color-text-base": "black",
    "--background-color-opacity50": "rgba(50, 90, 188, 0.5)",
  },
  biege: {
    "--background-color-base": "white",
    "--background-color-dark": "#f4dbba",
    "--background-color-medium": "antiquewhite",
    "--background-color-light": "#FFFBF7",
    "--background-color-intense": "#fcd53f",
    "--background-color-pale": "#fffbee",
    "--color-marker": "orangered",
    "--color-text-label": "#943600",
    "--color-text-inform": "#d6d5d4",
    "--color-text-base": "black",
    "--background-color-opacity50": "rgba(210, 203, 139, 0.5)",
  },

  vamp: {
    "--background-color-base": "#3B4163", //=
    "--background-color-dark": "#262234",
    "--background-color-medium": "black",
    "--background-color-light": "#262234", //+
    "--background-color-intense": "#5a0000",
    "--background-color-pale": "#253644",
    "--color-marker": "#ff0000",
    "--color-text-label": "white",
    "--color-text-inform": "#b44650",
    "--color-text-base": "#e7e7e7",
    "--background-color-opacity50": "rgba(187, 127, 162, 0.5)",
  },
  halk: {
    "--background-color-base": "#3B4163", //=
    "--background-color-dark": "#262234",
    "--background-color-medium": "black",
    "--background-color-light": "#262234", //+
    "--background-color-intense": "#012c29",
    "--background-color-pale": "#253644",
    "--color-marker": "#00ff1f",
    "--color-text-label": "white",
    "--color-text-inform": "forestgreen",
    "--color-text-base": "#e7e7e7",
    "--background-color-opacity50": "rgba(145, 152, 144, 0.5)",
  },
  night: {
    "--background-color-base": "#434b78", //=
    "--background-color-dark": "#000670",
    "--background-color-medium": "#180f46",
    "--background-color-light": "#211742", //+
    "--background-color-intense": "#296FD1",
    "--background-color-pale": "#070f44",
    "--color-marker": "#00a8ff",
    "--color-text-label": "white",
    "--color-text-inform": "steelblue",
    "--color-text-base": "#e7e7e7",
    "--background-color-opacity50": "rgba(90, 135, 224, 0.5)",
  },
};
export const getCurrentTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme) return theme;
  return "blue";
};

export const setTheme = (theme = "") => {
  //if user choose the theme - save his choise to the local storage
  if (theme) localStorage.setItem("theme", theme);
  //if user doesn't choose the theme try get it from the local storage or set default value
  let localTheme = theme ? theme : getCurrentTheme();
  if (localTheme === "blue" && !theme) return;
  if (localTheme) {
    const colors = themeArr[localTheme];
    for (let key in colors) {
      document.documentElement.style.setProperty(key, colors[key]);
    }
  }
};
