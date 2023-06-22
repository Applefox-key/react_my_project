import React, { useEffect, useState } from "react";
import cl from "./SideBar.module.scss";

import ThemesChoosing from "../UI/ThemesChoosing/ThemesChoosing";
import { getSettings, setSettings } from "../../utils/settings";

const SideBarSettings = () => {
  const [value, setValue] = useState(0);

  const setSett = (e) => {
    setValue(1 - value);
    setSettings("countBtn", 1 - value);
  };

  useEffect(() => {
    setValue(getSettings("countBtn"));
  }, []);
  return (
    <div>
      <h2>SETTINGS</h2>
      <br />
      <ThemesChoosing />
      <br />
      <label className={cl.checkboxL} htmlFor="showCount">
        show buttons for counting during training
      </label>
      <input
        checked={value}
        className={cl.checkbox}
        type="checkbox"
        id="showCount"
        onInput={setSett}
      />
    </div>
  );
};
export default SideBarSettings;
