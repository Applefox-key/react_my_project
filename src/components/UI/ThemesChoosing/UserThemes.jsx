import React, { useEffect, useState } from "react";
import cl from "./ThemesChoosing.module.scss";
import { getCurrentTheme, setTheme } from "../../../utils/colors";
import { useAuth } from "../../../hooks/useAuth";
import ThemeEdit from "./ThemeEdit";
import { usePopup } from "../../../hooks/usePopup";
import { userThemesDefault } from "../../../utils/colors";
import { saveUserTheme } from "../../../utils/settings";
const UserThemes = () => {
  const [colorTheme, setColorTheme] = useState("");
  const [editItem, setEditItem] = useState(null);
  const auth = useAuth(true);
  const [userThemesList, setUserThemeList] = useState(
    userThemesDefault(auth[1].set)
  );
  const setPopup = usePopup();
  const changeColor = (el) => {
    setColorTheme(el);
    setTheme(el, userThemesList);
  };
  useEffect(() => {
    setColorTheme(getCurrentTheme());
  }, []);

  const gradient = (el) => {
    let gradientColors = [
      "white" && userThemesList[el]["--background-color-light"],
      "grey" && userThemesList[el]["--background-color-intense"],
      "grey" && userThemesList[el]["--background-color-medium"],
      "grey" && userThemesList[el]["--background-color-dark"],
      "grey" && userThemesList[el]["--color-text-inform"],
      "grey" && userThemesList[el]["--color-marker"],
    ];

    // return `linear-gradient(90deg, ${gradientColors.join(", ")})`;
    return `linear-gradient(to bottom, ${gradientColors.join(", ")})`;
    // return `radial-gradient(circle at center, ${gradientColors.join(", ")})`;
  };

  const closeEditMode = async (newColors = "", el = "") => {
    setEditItem("");
    if (newColors) {
      const newThemeList = { ...userThemesList, [el]: newColors };
      saveUserTheme({ [el]: newColors }, setPopup, auth);
      setUserThemeList(newThemeList);
    } else setTheme();
  };

  return (
    <>
      <h2 className="mt-3">YOUR COLOR THEMES</h2>
      {editItem && (
        <div>
          <ThemeEdit
            item={editItem}
            colors={userThemesList[editItem]}
            callback={closeEditMode}
          />
        </div>
      )}
      <div className={cl.radioWrap}>
        {Object.keys(userThemesList).map((el) => (
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
              borderColor: "grey" && userThemesList[el]["--color-marker"],
              color: "grey" && userThemesList[el]["--color-text-label"],
            }}>
            <span>{el}</span>
            {!editItem && (
              <button onClick={() => setEditItem(el)}>...edit</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default UserThemes;
