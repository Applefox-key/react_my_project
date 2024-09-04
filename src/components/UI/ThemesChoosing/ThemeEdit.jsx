import React, { useEffect, useState } from "react";
import cl from "./ThemesChoosing.module.scss";

const ThemeEdit = ({ callback, item, colors }) => {
  const [theme, setTheme] = useState(colors);
  const changeTheme = (el, val) => {
    setTheme({ ...theme, [el]: val });
    document.documentElement.style.setProperty(el, val);
  };

  const themeVar = [
    ["--background-color-base", "base background"],
    ["--background-color-dark", "sidebar background"],
    ["--background-color-medium", "menu background"],
    ["--background-color-light", "card background"],
    ["--background-color-intense", "label background"],
    ["--background-color-pale", "info background"],
    ["--color-marker", "text marker"],
    ["--color-text-label", "label text"],
    ["--color-text-inform", "info text"],
    ["--color-text-base", "base text"],
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
          <div>
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
