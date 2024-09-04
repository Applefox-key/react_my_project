import React, { useState } from "react";
import cl from "./SideBar.module.scss";
import SideBarLabels from "./SideBarLabels";
import { RiListSettingsLine, RiPriceTag3Line } from "react-icons/ri";
import ExpressionsMenuIcons from "./ExpressionsMenuIcons";
import SideBarSettings from "./SideBarSettings";
import { CSSTransition } from "react-transition-group";

const SideBar = ({
  applyMode,
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
  const check = () => {
    if (applyMode.isOn) applyMode.applyOnOF();
  };
  return (
    <div className={cl["sideBar-wrap"]}>
      <div className={cl["sideBar-narrow"]} onClick={check}>
        <button onClick={() => showHide("settings")}>
          <RiListSettingsLine />
        </button>
        <button onClick={() => showHide("labels")}>
          <RiPriceTag3Line />
        </button>
        <ExpressionsMenuIcons expressionsActions={expressionsActions} />
      </div>
      {sideBar.show && (
        <CSSTransition
          appear={true}
          in={true}
          timeout={500}
          classNames="sidebar">
          <div className={cl["sideBar-wide"]}>
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
        </CSSTransition>
      )}
    </div>
  );
};

export default SideBar;
