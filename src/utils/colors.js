import { getSettings, setSettings } from "./settings";

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
  rain: {
    "--background-color-base": "#f8f8f6",
    "--background-color-dark": "#027dc5",
    "--background-color-medium": "#a0c3e2",
    "--background-color-light": "#d7e0eb",
    "--background-color-intense": "#027dc5",
    "--background-color-pale": "#f7f3ef",
    "--color-marker": "#00a6ed",
    "--color-text-label": "black",
    "--color-text-inform": "#5cb5e9",
    "--color-text-base": "black",
    "--background-color-opacity50": "rgb(215, 224, 235, 0.5)",
  },
  berry: {
    "--background-color-base": "#c7caf3",
    "--background-color-dark": "#5279db",
    "--background-color-medium": "#c7caf3",
    "--background-color-light": "#d9defe",
    "--background-color-intense": "#5379da",
    "--background-color-pale": "#c8c9f0",
    "--color-marker": "#ff3f88",
    "--color-text-label": "#3f2c26",
    "--color-text-inform": "#fe5f9c",
    "--color-text-base": "#402923",
    "--background-color-opacity50": "rgb(141, 151, 201,  0.5)",
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
    "--color-text-inform": "#ef9b77",
    "--color-text-base": "black",
    "--background-color-opacity50": "rgba(243, 226, 219, 0.5)",
  },

  simple: {
    "--background-color-base": "#ffffff",
    "--background-color-dark": "#ffffff",
    "--background-color-medium": "#ffffff",
    "--background-color-light": "#ffffff",
    "--background-color-intense": "#f5f1f0",
    "--background-color-pale": "#ebebeb",
    "--color-marker": "#000000",
    "--color-text-label": "#16073c",
    "--color-text-inform": "#b2b6ba",
    "--color-text-base": "#8f8a86",
    "--background-color-opacity50": "rgba(54, 103, 117, 0.5)",
  },
  milk: {
    "--background-color-base": "#f1f1f1",
    "--background-color-dark": "#f9f8f4",
    "--background-color-medium": "#f9f7f1",
    "--background-color-light": "#ffffff",
    "--background-color-intense": "#dbdbd9",
    "--background-color-pale": "#f7f3ef",
    "--color-marker": "#00a6ed",
    "--color-text-label": "black",
    "--color-text-inform": "#c1c1c1",
    "--color-text-base": "black",
    "--background-color-opacity50": "rgb(218, 217, 213,  0.5)",
  },

  grey: {
    "--background-color-base": "#e2e1dd",
    "--background-color-dark": "#9ca4ac",
    "--background-color-medium": "#dad7d2",
    "--background-color-light": "#e9e6df",
    "--background-color-intense": "#b3b3b3",
    "--background-color-pale": "#f6f7f0",
    "--color-marker": "#8188a4",
    "--color-text-label": "#000000",
    "--color-text-inform": "#bab9b4",
    "--color-text-base": "#6e6f74",
    "--background-color-opacity50": "rgb(227, 206, 174,0.5)",
  },
  violet: {
    "--background-color-base": "#cdb2dd",
    "--background-color-dark": "#7D3384",
    "--background-color-medium": "#f7c3f4",
    "--background-color-light": "#f6eaf4",
    "--background-color-intense": "#d76bc1",
    "--background-color-pale": "#f4cff8",
    "--color-marker": "#553834",
    "--color-text-label": "#f4eaf3",
    "--color-text-inform": "#b54cc2",
    "--color-text-base": "#402923",
    "--background-color-opacity50": "rgb(209, 148, 218 , 0.5)",
  },
  khaki: {
    "--background-color-base": "#69633f",
    "--background-color-dark": "#714c39",
    "--background-color-medium": "#b3a88c",
    "--background-color-light": "#dbd2c7",
    "--background-color-intense": "#8d7a74",
    "--background-color-pale": "#b3aa9e",
    "--color-marker": "#714c39",
    "--color-text-label": "#ffffff",
    "--color-text-inform": "#714c39",
    "--color-text-base": "#000000",
    "--background-color-opacity50": "rgb(105, 105, 68, 0.5)",
  },
  olive: {
    "--background-color-base": "#eaeaea",
    "--background-color-dark": "#edebdc",
    "--background-color-medium": "#c0ca83",
    "--background-color-light": "#f4f4f1",
    "--background-color-intense": "#f3f1e4",
    "--background-color-pale": "#edebdc",
    "--color-marker": "#95a05d",
    "--color-text-label": "#3e453e",
    "--color-text-inform": "#a6bb70",
    "--color-text-base": "black",
    "--background-color-opacity50": "rgb(249 241 202 , 0.5)",
  },
  mint: {
    "--background-color-base": "#eaf4fe",
    "--background-color-dark": "#6d7778",
    "--background-color-medium": "#d1dfe8",
    "--background-color-light": "#ffffff",
    "--background-color-intense": "#5dda96",
    "--background-color-pale": "#D2F0DF",
    "--color-marker": "#3ddb84",
    "--color-text-label": "#231c23",
    "--color-text-inform": "#69e6c4",
    "--color-text-base": "#697476",
    "--background-color-opacity50": "rgba(107,227,193,.5)",
  },

  vamp: {
    "--background-color-base": "#41434F", //=
    "--background-color-dark": "#000000",
    "--background-color-medium": "#5f010a",
    "--background-color-light": "#262234", //+
    "--background-color-intense": "#9E2224",
    "--background-color-pale": "#253644",
    "--color-marker": "#FF5E51",
    "--color-text-label": "white",
    "--color-text-inform": "#b44650",
    "--color-text-base": "#e7e7e7",
    "--background-color-opacity50": "rgba(187, 127, 162, 0.5)",
  },

  night: {
    "--background-color-base": "#434b78", //=
    "--background-color-dark": "#35395f",
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

  gold: {
    "--background-color-base": "#0e0e18",
    "--background-color-dark": "#0b0a0f",
    "--background-color-medium": "#1a2224",
    "--background-color-light": "#1c2225",
    "--background-color-intense": "#011e16",
    "--background-color-pale": "#253644",
    "--color-marker": "#ffff6d",
    "--color-text-label": "#94979a",
    "--color-text-inform": "#a7a7a5",
    "--color-text-base": "#7a8189",
    "--background-color-opacity50": "rgb(105, 105, 68, 0.5)",
  },
  black: {
    "--background-color-base": "#0e0e18",
    "--background-color-dark": "#0b0a0f",
    "--background-color-medium": "#1a2224",
    "--background-color-light": "#1c2225",
    "--background-color-intense": "#011e16",
    "--background-color-pale": "#252c2f",
    "--color-marker": "#b1838e",
    "--color-text-label": "#94979a",
    "--color-text-inform": "#434340",
    "--color-text-base": "#86909b",
    "--background-color-opacity50": "rgb(75, 75, 75,  0.5)",
  },
  dream: {
    "--background-color-base": "#111111",
    "--background-color-dark": "#111111",
    "--background-color-medium": "#111111",
    "--background-color-light": "#1e1e1e",
    "--background-color-intense": "#22162a",
    "--background-color-pale": "#2c1f39",
    "--color-marker": "#7e1aad",
    "--color-text-label": "#9a949a",
    "--color-text-inform": "#331b44",
    "--color-text-base": "#7a8189",
    "--background-color-opacity50": "rgb(65, 37, 70, 0.5)",
  },
  deep: {
    "--background-color-base": "#0b0a0f",
    "--background-color-dark": "#0b0a0f",
    "--background-color-medium": "#0b0a0f",
    "--background-color-light": "#011e16",
    "--background-color-intense": "#011e16",
    "--background-color-pale": "#023432",
    "--color-marker": "#03645f",
    "--color-text-label": "#94979a",
    "--color-text-inform": "#2d504c",
    "--color-text-base": "#7a8189",
    "--background-color-opacity50": "rgb(138, 225, 243, 0.5)",
  },
};
export const getCurrentTheme = () => {
  const theme = getSettings("theme", "sky");
  return theme;
};

export const setTheme = (theme = "") => {
  //if user choose the theme - save his choise to the local storage
  if (theme) setSettings("theme", theme);
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
