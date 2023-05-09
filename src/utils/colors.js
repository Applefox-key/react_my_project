export const themeArr = {
  sky: {
    "--background-color-base": "white",
    "--background-color-dark": "#6a99db",
    "--background-color-medium": "#C8E1FF",
    "--background-color-light": "ghostwhite",
    "--background-color-intense": "#286CCB",
    "--background-color-pale": "aliceblue",
    "--color-marker": "#0d6af5",
    "--color-text-label": "white",
    "--color-text-inform": "lightblue",
    "--color-text-base": "black",
    "--background-color-opacity50": "rgba(50, 90, 188, 0.5)",
  },
  sand: {
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
  light: {
    "--background-color-base": "#F4EDE7", //=
    "--background-color-dark": "#F3E2DB",
    "--background-color-medium": "#DADBDD",
    "--background-color-light": "#E2E3DE", //+
    "--background-color-intense": "#FE7A65",
    "--background-color-pale": "#C9BBB6",
    "--color-marker": "#FD520D",
    "--color-text-label": "black",
    "--color-text-inform": "#E2E3DE",
    "--color-text-base": "black",
    "--background-color-opacity50": "rgba(243, 226, 219, 0.5)",
  },
  mauve: {
    "--background-color-base": "#BCBECD",
    "--background-color-dark": "#91859B",
    "--background-color-medium": "#9F93A7",
    "--background-color-light": "#A4A0AD",
    "--background-color-intense": "#cfbbcc",
    "--background-color-pale": "#8d879b",
    "--color-marker": "#F8ECF0", //"#FFD9CD",
    "--color-text-label": "black",
    "--color-text-inform": "#e6c9d3",
    "--color-text-base": "black",
    "--background-color-opacity50": "rgba(116, 92, 92, 0.5)",
  },
  vamp: {
    "--background-color-base": "#41434F", //=
    "--background-color-dark": "#000000",
    "--background-color-medium": "#BA1E21",
    "--background-color-light": "#262234", //+
    "--background-color-intense": "#9E2224",
    "--background-color-pale": "#253644",
    "--color-marker": "#FF5E51",
    "--color-text-label": "white",
    "--color-text-inform": "#b44650",
    "--color-text-base": "#e7e7e7",
    "--background-color-opacity50": "rgba(187, 127, 162, 0.5)",
  },
  halk: {
    "--background-color-base": "#2B2F2B", //=
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
    "--background-color-intense": "#10376e",
    "--background-color-pale": "#070f44",
    "--color-marker": "#00a8ff",
    "--color-text-label": "white",
    "--color-text-inform": "steelblue",
    "--color-text-base": "#e7e7e7",
    "--background-color-opacity50": "rgba(90, 135, 224, 0.5)",
  },
  jade: {
    "--background-color-base": "#01040B", //=
    "--background-color-dark": "#1A424A",
    "--background-color-medium": "#242A3A",
    "--background-color-light": "#0C2623", //+
    "--background-color-intense": "#0E8C85",
    "--background-color-pale": "#323F49",
    "--color-marker": "#03FDCE",
    "--color-text-label": "white",
    "--color-text-inform": "#026C71",
    "--color-text-base": "#e7e7e7",
    "--background-color-opacity50": "rgba(54, 103, 117, 0.5)",
  },
};
export const getCurrentTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme) return theme;
  return "sky";
};

export const setTheme = (theme = "") => {
  //if user choose the theme - save his choise to the local storage
  if (theme) localStorage.setItem("theme", theme);
  //if user doesn't choose the theme try get it from the local storage or set default value
  let localTheme = theme ? theme : getCurrentTheme();
  if (localTheme === "sky" && !theme) return;
  if (localTheme) {
    const colors = themeArr[localTheme];
    for (let key in colors) {
      document.documentElement.style.setProperty(key, colors[key]);
    }
  }
};
