import React, { useEffect, useState } from "react";
import cl from "./SideBar.module.scss";

import ThemesChoosing from "../UI/ThemesChoosing/ThemesChoosing";
import { getSettings, setSettings } from "../../utils/settings";

const SideBarSettings = () => {
  const [value, setValue] = useState(false);

  const setSett = (e) => {
    const newV = !value;
    setValue(newV);
    setSettings("countBtn", newV);
  };

  useEffect(() => {
    setValue(getSettings("countBtn"));
  }, []);
  return (
    <div className={"settings_bar"}>
      <h2>SETTINGS</h2>
      <br />
      <div className={cl.checkbox_wrap}>
        <input
          checked={!!value}
          className={cl.checkbox}
          type="checkbox"
          id="showCount"
          onChange={setSett}
        />
        <label className={cl.checkboxL} htmlFor="showCount">
          show buttons for counting during training
        </label>
      </div>
      <ThemesChoosing />
      <br />
    </div>
  );
};
export default SideBarSettings;
