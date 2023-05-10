import React, { useEffect, useState } from "react";
import cl from "./ThemesChoosing.module.scss";
import { getCurrentTheme, setTheme, themeArr } from "../../../utils/colors";

const ThemesChoosing = () => {
  const [colorTheme, setColorTheme] = useState("");
  const changeColor = (e) => {
    setColorTheme(e.target.value);
    setTheme(e.target.value);
  };
  useEffect(() => {
    setColorTheme(getCurrentTheme());
  }, []);

  const gradient = (el) => {
    // let gradientColors = [
    //   themeArr[el]["--color-marker"],
    //   themeArr[el]["--background-color-intense"],
    //   themeArr[el]["--background-color-dark"],
    //   themeArr[el]["--background-color-medium"],
    //   themeArr[el]["--background-color-light"],
    // ];
    let gradientColors = [
      themeArr[el]["--background-color-light"],
      themeArr[el]["--background-color-intense"],
      themeArr[el]["--background-color-medium"],
      themeArr[el]["--background-color-dark"],
      themeArr[el]["--color-text-inform"],
      themeArr[el]["--color-marker"],
    ];
    // return `linear-gradient(90deg, ${gradientColors.join(", ")})`;
    return `linear-gradient(to bottom, ${gradientColors.join(", ")})`;
    // return `radial-gradient(circle at center, ${gradientColors.join(", ")})`;
  };
  return (
    <div>
      <h3>COLOR THEMES</h3>
      <div className={cl.radioWrap}>
        {Object.keys(themeArr).map((el) => (
          <div key={el}>
            <div className={cl["radio-input"]}>
              <input
                checked={colorTheme === el}
                value={el}
                onChange={changeColor}
                name="color"
                id={el}
                type="radio"
              />
              <label
                htmlFor={el}
                className={colorTheme === el ? cl["label-active"] : ""}
                style={{
                  // background: themeArr[el]["--background-color-intense"],
                  background: gradient(el),
                  color: themeArr[el]["--color-text-label"],
                }}>
                {colorTheme === el ? "🗸" : ""} <span>{el}</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemesChoosing;
