import React, { useState } from "react";
import cl from "./SideBar.module.scss";
import SideBarLabels from "./SideBarLabels";

import ThemesChoosing from "../UI/ThemesChoosing/ThemesChoosing";
import ExpressionsMenuIcons from "./ExpressionsMenuIcons";
const SideBar = ({ addOne, setExpressions, selectedid, onSelectLabel }) => {
  const [sideBar, setSideBar] = useState({ show: false });
  return (
    <div className={cl["sideBar-wrap"]}>
      <div className={cl["sideBar-narrow"]}>
        <button onClick={() => setSideBar({ ...sideBar, show: !sideBar.show })}>
          ☰
        </button>
        <ExpressionsMenuIcons setExpressions={setExpressions} addOne={addOne} />
      </div>
      {sideBar.show && (
        <div className={cl["sideBar-wide"]}>
          <ThemesChoosing />
          <SideBarLabels onSelect={onSelectLabel} selectedid={selectedid} />
        </div>
      )}
    </div>
  );
};

export default SideBar;
