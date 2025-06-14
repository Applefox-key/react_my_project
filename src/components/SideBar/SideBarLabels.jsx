import React, { useEffect, useState } from "react";
import cl from "./SideBar.module.scss";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";
import { CiMenuKebab } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import { BiCloset } from "react-icons/bi";
import {
  MdOutlineLabelOff,
  MdOutlineSettingsBackupRestore,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import LabelEdit from "../Labels/LabelEdit";
import MySpinner from "../UI/MySpinner/MySpinner";
import ProgressColumnFilter from "../UI/MyProgressBar/ProgressColumnFilter";
import { RiFilterOffLine } from "react-icons/ri";

const SideBarLabels = ({
  filterChange,
  filters,
  handleDragStart,
  showHide,
}) => {
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
      tabIndex={-1}
      onBlur={(e) => {
        if (!e.relatedTarget) setIsMenu("");
      }}>
      <div className={cl.subLine}>
        <ProgressColumnFilter
          stage={filters.stage}
          filterChange={filterChange}
        />
        <h2>LABELS IN THE LIST</h2>
        <div className={cl.lblSide}>
          <button
            className={cl.btnPlus}
            title="clear the labels "
            draggable
            onDragStart={(e) => handleDragStart(e, "")}
            onClick={(e) => {
              e.stopPropagation();
              selectFn("", true);
              if (window.screen.availWidth < 900) showHide("labels");
              setIsMenu(false);
            }}>
            <MdOutlineLabelOff />
            Clear Tags
          </button>
          {!!filters.labelid && (
            <button
              className={cl.btnPlus}
              title="clear filter by labels"
              onClick={(e) => selectFn()}>
              <RiFilterOffLine /> FILTER by "{filters.label}"
            </button>
          )}
        </div>{" "}
        <h2>CHOOSE FOR FILTER OR EDIT</h2>
      </div>

      <LabelEdit
        isNew={true}
        callback={() => {
          getLabels();
        }}
      />
      <div
        className={cl["link-box1"]}
        onClick={(e) => selectFn({ name: "no label", id: "null" })}>
        <div>
          <span>✦</span>
          no labels
        </div>
        {/* <CiMenuKebab /> */}
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    selectFn(el, true);
                    if (window.screen.availWidth < 900) showHide("labels");
                    setIsMenu(false);
                  }}>
                  <BiCloset /> apply label
                </button>

                <LabelEdit
                  label={el}
                  callback={() => {
                    getLabels();
                  }}
                />
                <button
                  title="delete label"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteOne(el);
                  }}>
                  <TiDeleteOutline />
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
