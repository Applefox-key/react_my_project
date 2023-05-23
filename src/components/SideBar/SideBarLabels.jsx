import React, { useEffect, useState } from "react";
import cl from "./SideBar.module.scss";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";
import { CiMenuKebab } from "react-icons/ci";
import { RiDeleteRow } from "react-icons/ri";
import { HiOutlineFilter } from "react-icons/hi";
import { AiOutlineClear } from "react-icons/ai";
import { BiCloset } from "react-icons/bi";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import LabelNew from "../Labels/LabelNew";
import MySpinner from "../UI/MySpinner/MySpinner";
import ProgressColumnFilter from "../UI/MyProgressBar/ProgressColumnFilter";

const SideBarLabels = ({ filterChange, filters, handleDragStart }) => {
  const [labels, setLabels] = useState([]);
  const [isMenu, setIsMenu] = useState(false);
  const [getLabels, isLoadingCat] = useQuery(async () => {
    const cat = await BaseAPI.getLabelsList();
    setLabels(cat);
  });
  const router = useNavigate();
  const classGenerator = (item) => {
    const active_id = !filters.labelid ? "" : filters.labelid;
    const item_id = item.id;

    return [
      cl["link-box"],
      active_id === item_id ? cl["link-box-active"] : "",
    ].join(" ");
  };
  useEffect(() => {
    getLabels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteOne = async (element) => {
    if (!window.confirm("Delete this label?")) return;
    await BaseAPI.deleteLabel(element.id);
    let arr = labels.filter((elem) => elem.id !== element.id);
    setLabels(arr);
  };
  const selectFn = (val, isApl = false) => {
    filterChange({ value: val, isApply: isApl, filterName: "label" });
  };

  return (
    <div
      // className={cl["sideBar-wide"]}
      tabIndex={-1}
      onBlur={(e) => {
        if (!e.relatedTarget) setIsMenu("");
      }}>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <ProgressColumnFilter
          stage={filters.stage}
          filterChange={filterChange}
        />{" "}
        <br /> <h3 className={cl.titleString}>LABELS</h3>
        <div className="d-flex align-items-center">
          {/* <h3>LABELS</h3> */}
          <LabelNew
            callback={() => {
              getLabels();
            }}
          />
          <button
            className={cl.btnPlus}
            title="show items without labels"
            onClick={(e) => selectFn({ name: "no label", id: "null" })}>
            <HiOutlineFilter />
          </button>
          <button
            className={cl.btnPlus}
            title="clear the labels"
            draggable
            onDragStart={(e) => handleDragStart(e, "")}
            onClick={(e) => {
              e.stopPropagation();
              selectFn("", true);
              setIsMenu(false);
            }}>
            {" "}
            <AiOutlineClear />
          </button>
        </div>
      </div>
      {isLoadingCat ? (
        <MySpinner />
      ) : (
        labels.map((el) => (
          <div
            className={classGenerator(el)}
            key={el.id}
            draggable
            onDragStart={(e) => handleDragStart(e, el.id)}
            onClick={() => selectFn(el)}>
            <div>
              <span>✦</span>
              {el.name}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenu(isMenu ? "" : el.id);
              }}>
              <CiMenuKebab />
            </button>
            {isMenu === el.id && (
              <div className={cl.miniMenu} id="miniMenu">
                {
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      selectFn(el, true);
                      setIsMenu(false);
                    }}>
                    <BiCloset /> apply label
                  </button>
                }
                <button
                  title="delete label"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteOne(el);
                  }}>
                  <RiDeleteRow />
                  delete label
                </button>
                <button
                  title=" to training"
                  onClick={(e) => {
                    e.stopPropagation();
                    router(`/training/${el.id}/${el.name}`);
                  }}>
                  <MdOutlineSettingsBackupRestore /> to training
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
export default SideBarLabels;
