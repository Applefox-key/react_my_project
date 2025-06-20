import { getSettings, setSettings } from "./settings";

export const getContrastColor = (color) => {
  // to RGB
  const red = parseInt(color.substring(1, 3), 16);
  const green = parseInt(color.substring(3, 5), 16);
  const blue = parseInt(color.substring(5, 7), 16);
  // brightness by YIQ
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  // if< 128, black, else white
  if (brightness < 128) {
    return "#fff";
  } else {
    return "#000";
  }
};

export const themeArr = {
  sky: {
    "--background-base": "white",
    "--background-sidebar": "#6a99db",
    "--background-card": "ghostwhite",
    "--background-label": "#286CCB",
    "--background-menu": "#C8E1FF",
    "--background-info": "aliceblue",
    "--color-marker": "#0d6af5",
    "--color-label": "white",
    "--color-sidebar": "white",
    "--color-info": "lightblue",
    "--color-card": "black",
    "--color-menu": "black",
    "--color-base": "black",
    "--background-color-opacity50": "rgba(50, 90, 188, 0.5)",
  },
  rain: {
    "--background-base": "#f8f8f6",
    "--background-sidebar": "#027dc5",
    "--background-menu": "#a0c3e2",
    "--background-card": "#d7e0eb",
    "--background-label": "#027dc5",
    "--background-info": "#f7f3ef",
    "--color-marker": "#00a6ed",
    "--color-label": "black",
    "--color-sidebar": "black",
    "--color-info": "#5cb5e9",
    "--color-card": "black",
    "--color-menu": "black",
    "--color-base": "black",
    "--background-color-opacity50": "rgb(215, 224, 235, 0.5)",
  },
  berry: {
    "--background-base": "#c7caf3",
    "--background-sidebar": "#5279db",
    "--background-menu": "#c7caf3",
    "--background-card": "#d9defe",
    "--background-label": "#5379da",
    "--background-info": "#c8c9f0",
    "--color-marker": "#ff3f88",
    "--color-label": "#3f2c26",
    "--color-sidebar": "#100f0e",
    "--color-info": "#fe5f9c",
    "--color-card": "#402923",
    "--color-menu": "#402923",
    "--color-base": "#402923",
    "--background-color-opacity50": "rgb(141, 151, 201,  0.5)",
  },
  sand: {
    "--background-base": "white",
    "--background-sidebar": "#f4dbba",
    "--background-menu": "antiquewhite",
    "--background-card": "#FFFBF7",
    "--background-label": "#fcd53f",
    "--background-info": "#fffbee",
    "--color-marker": "orangered",
    "--color-label": "#943600",
    "--color-sidebar": "#943600",
    "--color-info": "#d6d5d4",
    "--color-card": "black",
    "--color-menu": "black",
    "--color-base": "black",
    "--background-color-opacity50": "rgba(210, 203, 139, 0.5)",
  },
  light: {
    "--background-base": "#F4EDE7", //=
    "--background-sidebar": "#F3E2DB",
    "--background-menu": "#DADBDD",
    "--background-card": "#E2E3DE", //+
    "--background-label": "#FE7A65",
    "--background-info": "#C9BBB6",
    "--color-marker": "#FD520D",
    "--color-label": "black",
    "--color-sidebar": "black",
    "--color-info": "#ef9b77",
    "--color-card": "black",
    "--color-menu": "black",
    "--color-base": "black",
    "--background-color-opacity50": "rgba(243, 226, 219, 0.5)",
  },

  simple: {
    "--background-base": "#ffffff",
    "--background-sidebar": "#ffffff",
    "--background-menu": "#ffffff",
    "--background-card": "#ffffff",
    "--background-label": "#f5f1f0",
    "--background-info": "#ebebeb",
    "--color-marker": "#000000",
    "--color-label": "#16073c",
    "--color-sidebar": "#16073c",
    "--color-info": "#b2b6ba",
    "--color-card": "#8f8a86",
    "--color-menu": "#8f8a86",
    "--color-base": "#8f8a86",
    "--background-color-opacity50": "rgba(54, 103, 117, 0.5)",
  },
  milk: {
    "--background-base": "#f1f1f1",
    "--background-sidebar": "#f9f8f4",
    "--background-menu": "#f9f7f1",
    "--background-card": "#ffffff",
    "--background-label": "#dbdbd9",
    "--background-info": "#f7f3ef",
    "--color-marker": "#00a6ed",
    "--color-label": "black",
    "--color-sidebar": "black",
    "--color-info": "#c1c1c1",
    "--color-card": "black",
    "--color-menu": "black",
    "--color-base": "black",
    "--background-color-opacity50": "rgb(218, 217, 213,  0.5)",
  },

  grey: {
    "--background-base": "#e2e1dd",
    "--background-sidebar": "#9ca4ac",
    "--background-menu": "#dad7d2",
    "--background-card": "#e9e6df",
    "--background-label": "#b3b3b3",
    "--background-info": "#f6f7f0",
    "--color-marker": "#8188a4",
    "--color-label": "#000000",
    "--color-sidebar": "#000000",
    "--color-info": "#bab9b4",
    "--color-card": "#6e6f74",
    "--color-menu": "#6e6f74",
    "--color-base": "#6e6f74",
    "--background-color-opacity50": "rgb(227, 206, 174,0.5)",
  },
  violet: {
    "--background-base": "#cdb2dd",
    "--background-sidebar": "#7D3384",
    "--background-menu": "#f7c3f4",
    "--background-card": "#f6eaf4",
    "--background-label": "#d76bc1",
    "--background-info": "#f4cff8",
    "--color-marker": "#553834",
    "--color-label": "#f4eaf3",
    "--color-sidebar": "#f4eaf3",
    "--color-info": "#b54cc2",
    "--color-card": "#402923",
    "--color-menu": "#402923",
    "--color-base": "#402923",
    "--background-color-opacity50": "rgb(209, 148, 218 , 0.5)",
  },
  khaki: {
    "--background-base": "#69633f",
    "--background-sidebar": "#714c39",
    "--background-menu": "#b3a88c",
    "--background-card": "#dbd2c7",
    "--background-label": "#8d7a74",
    "--background-info": "#b3aa9e",
    "--color-marker": "#010101",
    "--color-label": "#ffffff",
    "--color-sidebar": "#ffffff",
    "--color-info": "#714c39",
    "--color-card": "#000000",
    "--color-menu": "#000000",
    "--color-base": "#000000",
    "--background-color-opacity50": "rgb(105, 105, 68, 0.5)",
  },
  olive: {
    "--background-base": "#eaeaea",
    "--background-sidebar": "#edebdc",
    "--background-menu": "#c0ca83",
    "--background-card": "#f4f4f1",
    "--background-label": "#f3f1e4",
    "--background-info": "#edebdc",
    "--color-marker": "#95a05d",
    "--color-label": "#3e453e",
    "--color-sidebar": "#3e453e",
    "--color-info": "#a6bb70",
    "--color-card": "black",
    "--color-menu": "black",
    "--color-base": "black",
    "--background-color-opacity50": "rgb(249 241 202 , 0.5)",
  },
  mint: {
    "--background-base": "#eaf4fe",
    "--background-sidebar": "#6d7778",
    "--background-menu": "#d1dfe8",
    "--background-card": "#ffffff",
    "--background-label": "#5dda96",
    "--background-info": "#D2F0DF",
    "--color-marker": "#3ddb84",
    "--color-label": "#231c23",
    "--color-sidebar": "#231c23",
    "--color-info": "#69e6c4",
    "--color-card": "#697476",
    "--color-menu": "#697476",
    "--color-base": "#697476",
    "--background-color-opacity50": "rgba(107,227,193,.5)",
  },
  stone: {
    "--background-base": "white",
    "--background-sidebar": "#2b2e4d",
    "--background-menu": "#c2e6d2",
    "--background-card": "ghostwhite",
    "--background-label": "#158267",
    "--background-info": "aliceblue",
    "--color-marker": "#4db4b2",
    "--color-label": "white",
    "--color-sidebar": "white",
    "--color-info": "lightblue",
    "--color-card": "#535b5c",
    "--color-menu": "#535b5c",
    "--color-base": "#535b5c",
    "--background-color-opacity50": "rgb(201 255 240 / 50%)",
  },

  vamp: {
    "--background-base": "#41434F", //=
    "--background-sidebar": "#000000",
    "--background-menu": "#5f010a",
    "--background-card": "#262234", //+
    "--background-label": "#9E2224",
    "--background-info": "#253644",
    "--color-marker": "#FF5E51",
    "--color-label": "white",
    "--color-sidebar": "white",
    "--color-info": "#b44650",
    "--color-card": "#e7e7e7",
    "--color-menu": "#e7e7e7",
    "--color-base": "#e7e7e7",
    "--background-color-opacity50": "rgba(187, 127, 162, 0.5)",
  },

  night: {
    "--background-base": "#434b78", //=
    "--background-sidebar": "#35395f",
    "--background-menu": "#180f46",
    "--background-card": "#211742", //+
    "--background-label": "#10376e",
    "--background-info": "#070f44",
    "--color-marker": "#00a8ff",
    "--color-label": "white",
    "--color-sidebar": "white",
    "--color-info": "steelblue",
    "--color-card": "#e7e7e7",
    "--color-menu": "#e7e7e7",
    "--color-base": "#e7e7e7",
    "--background-color-opacity50": "rgba(90, 135, 224, 0.5)",
  },
  jade: {
    "--background-base": "#01040B", //=
    "--background-sidebar": "#1A424A",
    "--background-menu": "#242A3A",
    "--background-card": "#0C2623", //+
    "--background-label": "#0E8C85",
    "--background-info": "#323F49",
    "--color-marker": "#03FDCE",
    "--color-label": "white",
    "--color-sidebar": "white",
    "--color-info": "#026C71",
    "--color-card": "#e7e7e7",
    "--color-menu": "#e7e7e7",
    "--color-base": "#e7e7e7",
    "--background-color-opacity50": "rgba(54, 103, 117, 0.5)",
  },
  halk: {
    "--background-base": "#2B2F2B", //=
    "--background-sidebar": "#262234",
    "--background-menu": "black",
    "--background-card": "#262234", //+
    "--background-label": "#012c29",
    "--background-info": "#253644",
    "--color-marker": "#00ff1f",
    "--color-label": "white",
    "--color-sidebar": "white",
    "--color-info": "forestgreen",
    "--color-card": "#e7e7e7",
    "--color-menu": "#e7e7e7",
    "--color-base": "#e7e7e7",
    "--background-color-opacity50": "rgba(145, 152, 144, 0.5)",
  },

  gold: {
    "--background-base": "#0e0e18",
    "--background-sidebar": "#0b0a0f",
    "--background-menu": "#1a2224",
    "--background-card": "#1c2225",
    "--background-label": "#011e16",
    "--background-info": "#253644",
    "--color-marker": "#ffff6d",
    "--color-label": "#94979a",
    "--color-sidebar": "#94979a",
    "--color-info": "#a7a7a5",
    "--color-card": "#7a8189",
    "--color-menu": "#7a8189",
    "--color-base": "#7a8189",
    "--background-color-opacity50": "rgb(105, 105, 68, 0.5)",
  },
  black: {
    "--background-base": "#0e0e18",
    "--background-sidebar": "#0b0a0f",
    "--background-menu": "#1a2224",
    "--background-card": "#1c2225",
    "--background-label": "#011e16",
    "--background-info": "#252c2f",
    "--color-marker": "#b1838e",
    "--color-label": "#94979a",
    "--color-sidebar": "#94979a",
    "--color-info": "#434340",
    "--color-card": "#86909b",
    "--color-menu": "#86909b",
    "--color-base": "#86909b",
    "--background-color-opacity50": "rgb(75, 75, 75,  0.5)",
  },
  dream: {
    "--background-base": "#111111",
    "--background-sidebar": "#111111",
    "--background-menu": "#111111",
    "--background-card": "#1e1e1e",
    "--background-label": "#22162a",
    "--background-info": "#2c1f39",
    "--color-marker": "#7e1aad",
    "--color-label": "#9a949a",
    "--color-sidebar": "#9a949a",
    "--color-info": "#000000",
    "--color-card": "#7a8189",
    "--color-menu": "#7a8189",
    "--color-base": "#7a8189",
    "--background-color-opacity50": "rgb(65, 37, 70, 0.5)",
  },
  deep: {
    "--background-base": "#0b0a0f",
    "--background-sidebar": "#0b0a0f",
    "--background-menu": "#0b0a0f",
    "--background-card": "#011e16",
    "--background-label": "#011e16",
    "--background-info": "#023432",
    "--color-marker": "#03645f",
    "--color-label": "#94979a",
    "--color-sidebar": "#94979a",
    "--color-info": "#2d504c",
    "--color-card": "#7a8189",
    "--color-menu": "#7a8189",
    "--color-base": "#7a8189",
    "--background-color-opacity50": "rgb(138, 225, 243, 0.5)",
  },
  twilight: {
    "--background-base": "#000000",
    "--background-sidebar": "#0d121d",
    "--background-menu": "#343f59",
    "--background-card": "#0d121d",
    "--background-label": "#212837",
    "--background-info": "#121821",
    "--color-marker": "#768ec6",
    "--color-label": "#768ec6",
    "--color-sidebar": "#6d83b8",
    "--color-info": "#575757",
    "--color-card": "#5f7098",
    "--color-menu": "#a8bee0",
    "--color-base": "#e4e4e4",
    "--background-color-opacity50": "rgb(52, 62, 89, 0.5)",
  },
  // --background-base: #000000;
  // --background-sidebar: #0d121d;
  // --background-menu: #343f59;
  // --background-card: #0d121d;
  // --background-label: #212837;
  // --background-info: #121821;
  // --color-marker: #768ec6;
  // --color-label: #768ec6;
  // --color-sidebar: #6d83b8;
  // --color-info: #575757;
  // --color-card: #5f7098;
  // --color-menu: #a8bee0;
  // --color-base: #e4e4e4;
  // --background-color-opacity50: rgba(54, 103, 117, 0.5);
};
export const userThemesDefault = (user_set) => {
  return {
    one: themeArr.simple,
    two: themeArr.simple,
    three: themeArr.simple,
    four: themeArr.simple,
    ...user_set,
  };
};

export const getCurrentTheme = () => {
  const theme = getSettings("theme", "sky");
  return theme;
};

export const setTheme = (theme = "", usersTheme = "") => {
  //if user choose the theme - save his choise to the local storage
  if (theme) setSettings("theme", theme);
  //if user doesn't choose the theme try get it from the local storage or set default value
  let localTheme = theme ? theme : getCurrentTheme();
  if (localTheme === "sky" && !theme) return;
  if (localTheme) {
    const colors = themeArr.hasOwnProperty(localTheme)
      ? themeArr[localTheme]
      : usersTheme[localTheme];
    for (let key in colors) {
      document.documentElement.style.setProperty(key, colors[key]);
    }
  }
};
