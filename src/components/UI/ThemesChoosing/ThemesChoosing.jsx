import React, { useEffect, useState } from "react";
import cl from "./ThemesChoosing.module.scss";
import { getCurrentTheme, setTheme, themeArr } from "../../../utils/colors";

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
      <h5>COLOR THEMES</h5>
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
              color: themeArr[el]["--color-text-label"],
            }}>
            <span>{el}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemesChoosing;
