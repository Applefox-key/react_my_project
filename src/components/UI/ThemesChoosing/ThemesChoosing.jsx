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
  return (
    <div>
      <h3>COLOR THEMES</h3>
      <div className={cl.radioWrap}>
        {Object.keys(themeArr).map((el) => (
          <div>
            <div class={cl["radio-input"]}>
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
                  background: themeArr[el]["--background-color-intense"],
                  color: themeArr[el]["--color-text-label"],
                }}>
                {colorTheme === el ? "🗸" : ""}{" "}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemesChoosing;
