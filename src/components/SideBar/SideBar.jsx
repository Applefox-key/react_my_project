import React, { useState } from "react";
import cl from "./SideBar.module.scss";
import SideBarLabels from "./SideBarLabels";
import { RiArrowGoBackLine, RiListSettingsLine } from "react-icons/ri";

import SideBarSettings from "./SideBarSettings";
import { CSSTransition } from "react-transition-group";
import SideBarManage from "./SideBarManage";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegFolder } from "react-icons/fa";

const SideBar = ({
  applyMode,
  expressionActions,
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
        <button
          onClick={() => showHide("manage")}
          className={sideBar && sideBar.name === "manage" ? cl.btnA : ""}>
          <HiOutlineDotsHorizontal />
        </button>{" "}
        <button title="add one" onClick={expressionActions.addNew}>
          <GoPlus />
        </button>
        <button
          onClick={() => showHide("labels")}
          className={sideBar && sideBar.name === "labels" ? cl.btnA : ""}>
          <FaRegFolder />
        </button>
        {/* <ExpressionsMenuIcons expressionActions={expressionActions} />{" "} */}
        <button
          onClick={() => showHide("settings")}
          className={sideBar && sideBar.name === "settings" ? cl.btnA : ""}>
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
              <SideBarManage expressionActions={expressionActions} />
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
