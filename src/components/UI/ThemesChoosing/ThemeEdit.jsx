import React, { useState } from "react";
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

  // {
  //   "--background-color-base": "white",
  //   "--background-color-dark": "#6a99db",
  //   "--background-color-medium": "#C8E1FF",
  //   "--background-color-light": "ghostwhite",
  //   "--background-color-intense": "#286CCB",
  //   "--background-color-pale": "aliceblue",
  //   "--color-marker": "#0d6af5",
  //   "--color-text-label": "white",
  //   "--color-text-inform": "lightblue",
  //   "--color-text-base": "black",
  //   "--background-color-opacity50": "rgba(50, 90, 188, 0.5)",
  // }
  // const addNew = async () => {
  //   if (!name) return;
  //   await BaseAPI.createLabel(name);
  //   if (callback) await callback();
  //   setIsEdit(false);
  // };
  // const edit = async () => {
  //   if (!name) return;
  //   await BaseAPI.editLabel({ name: name }, label.id);
  //   if (callback) await callback();
  //   setIsEdit(false);
  // };
  return (
    <div className={cl.editColorsWrap}>
      <div className={cl.editColors}>
        <button onClick={(e) => callback(theme, item)}>save & apply</button>
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

        {/* {!item ? (
          <button className={cl.btnPlus} onClick={() => setIsEdit(true)}>
            <FaPlus />
          </button>
        ) : (
          <button className={cl.btnEdit} onClick={() => setIsEdit(true)}>
            <CiEdit /> edit label
          </button>
        )} */}
        {/* <MyModal
          show={true}
          setshowmodal={callback}
          title={item ? "EDIT LABEL" : "NEW LABEL"}
          dialogClassName={cl.editTheme}>
          <div>
            {" "}
            <input
              type="color"
              id="colorBack"
              onChange={(e) =>
                changeTheme("--background-color-base", e.target.value)
              }
              value={theme["--background-color-base"]}
              title="Choose your background color"
            />
            <button disabled={!theme} className={cl.btnNL}>
              {item ? "SAVE" : "ADD"}
            </button>
          </div>
        </MyModal> */}
      </div>
    </div>
  );
};

export default ThemeEdit;
