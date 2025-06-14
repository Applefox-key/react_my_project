import React, { useState } from "react";
import cl from "./SideBar.module.scss";
import SideBarLabels from "./SideBarLabels";
import {
  RiArrowGoBackLine,
  RiListSettingsLine,
  RiPriceTag3Line,
} from "react-icons/ri";

import SideBarSettings from "./SideBarSettings";
import { CSSTransition } from "react-transition-group";
import SideBarManage from "./SideBarManage";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

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
  const router = useNavigate();
  return (
    <div className={cl["sideBar-wrap"]}>
      <div className={cl["sideBar-narrow"]} onClick={check}>
        <button onClick={() => showHide("manage")}>
          <HiOutlineDotsHorizontal />
        </button>{" "}
        <button title="add one" onClick={expressionsActions.addNew}>
          <GoPlus />
        </button>
        <button onClick={() => showHide("labels")}>
          <RiPriceTag3Line />
        </button>
        {/* <ExpressionsMenuIcons expressionsActions={expressionsActions} />{" "} */}
        <button onClick={() => showHide("settings")}>
          <RiListSettingsLine />
        </button>{" "}
        <button title="Back to training" onClick={() => router("/training")}>
          <RiArrowGoBackLine />
        </button>{" "}
      </div>
      {sideBar.show && (
        <CSSTransition
          appear={true}
          in={true}
          timeout={500}
          classNames="sidebar">
          <div className={cl["sideBar-wide"]}>
            {sideBar.name === "settings" && <SideBarSettings />}{" "}
            {sideBar.name === "manage" && (
              <SideBarManage expressionsActions={expressionsActions} />
            )}{" "}
            {sideBar.name === "labels" && (
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
