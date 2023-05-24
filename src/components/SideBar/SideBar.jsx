import React, { useState } from "react";
import cl from "./SideBar.module.scss";
import SideBarLabels from "./SideBarLabels";
import { RiPriceTag3Line } from "react-icons/ri";
import ExpressionsMenuIcons from "./ExpressionsMenuIcons";
import SideBarSettings from "./SideBarSettings";
const SideBar = ({
  setExpressions,
  expressionsActions,
  filters,
  filterChange,
  handleDragStart,
}) => {
  const [sideBar, setSideBar] = useState({ show: false });

  const showHide = (name) => {
    if (name === sideBar.name) setSideBar({ show: false });
    else setSideBar({ show: true, name: name });
  };

  return (
    <div className={cl["sideBar-wrap"]}>
      <div className={cl["sideBar-narrow"]}>
        <button onClick={() => showHide("settings")}>☰</button>{" "}
        <button onClick={() => showHide("labels")}>
          <RiPriceTag3Line />
        </button>
        <ExpressionsMenuIcons
          setExpressions={setExpressions}
          expressionsActions={expressionsActions}
        />
      </div>
      {sideBar.show && (
        <div className={cl["sideBar-wide"]}>
          {" "}
          {sideBar.name === "settings" ? (
            <SideBarSettings />
          ) : (
            <SideBarLabels
              showHide={showHide}
              filterChange={filterChange}
              filters={filters}
              handleDragStart={handleDragStart}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SideBar;
