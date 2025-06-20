import React, { useState } from "react";
import cl from "./ThemesChoosing.module.scss";

const ThemeEdit = ({ callback, item, colors }) => {
  const [theme, setTheme] = useState(colors);
  const changeTheme = (el, val) => {
    setTheme({ ...theme, [el]: val });
    document.documentElement.style.setProperty(el, val);
  };

  const themeVar = [
    ["--background-base", "base background"],
    ["--color-base", "base text"],
    ["--background-card", "card background"],
    ["--color-card", "card text"],
    ["--color-marker", "text marker"],
    ["--background-sidebar", "sidebar background"],
    ["--color-sidebar", "sidebar text"],
    ["--background-menu", "menu background"],
    ["--color-menu", "menu text"],
    ["--background-label", "label background"],
    ["--color-label", "label text"],
    ["--background-info", "info background"],
    ["--color-info", "info text"],
  ];
  console.log(item);

  return (
    <div className={cl.editColorsWrap}>
      <div className={cl.editColors}>
        <span>USER THEME: {item}</span>
        <button className={cl.btnClose} onClick={(e) => callback()}>
          x
        </button>
        {themeVar.map((el, i) => (
          <div key={i}>
            <label htmlFor={"color" + i}>{el[1]}</label>{" "}
            <input
              type="color"
              id={"color" + i}
              onChange={(e) => changeTheme(el[0], e.target.value)}
              value={theme[el[0]]}
              title={"Choose " + el[1]}
            />
          </div>
        ))}
        <button onClick={(e) => callback(theme, item)}>save & apply</button>
      </div>
    </div>
  );
};

export default ThemeEdit;
