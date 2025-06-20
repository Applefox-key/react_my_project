import React, { useEffect, useState } from "react";
import cl from "./ThemesChoosing.module.scss";
import { getCurrentTheme, setTheme, themeArr } from "../../../utils/colors";
import UserThemes from "./UserThemes";

const ThemesChoosing = () => {
  const [colorTheme, setColorTheme] = useState("");

  const changeColor = (el) => {
    setColorTheme(el);

    setTheme(el);
  };
  useEffect(() => {
    setColorTheme(getCurrentTheme());
  }, []);

  const gradient = (el) => {
    let gradientColors = [
      themeArr[el]["--background-card"],
      themeArr[el]["--background-label"],
      themeArr[el]["--background-menu"],
      themeArr[el]["--background-sidebar"],
      themeArr[el]["--color-info"],
      themeArr[el]["--color-marker"],
    ];

    // return `linear-gradient(90deg, ${gradientColors.join(", ")})`;
    return `linear-gradient(to bottom, ${gradientColors.join(", ")})`;
    // return `radial-gradient(circle at center, ${gradientColors.join(", ")})`;
  };

  return (
    <div className={"settings_bar"}>
      <h2>BACIS COLOR THEMES</h2>
      <div className={cl.radioWrap}>
        {Object.keys(themeArr).map((el) => (
          <div
            key={el}
            onClick={() => changeColor(el)}
            className={
              colorTheme === el
                ? [cl.planet, cl["planet-active"]].join(" ")
                : cl.planet
            }
            style={{
              background: gradient(el),
              borderColor: themeArr[el]["--color-marker"],
              color: themeArr[el]["--color-label"],
            }}>
            <span>{el}</span>
          </div>
        ))}
      </div>
      <UserThemes />
    </div>
  );
};

export default ThemesChoosing;
