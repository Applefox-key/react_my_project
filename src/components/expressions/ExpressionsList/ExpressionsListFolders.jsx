import React, { useState, useEffect, useRef } from "react";
import MyFilter from "../../UI/MyFilter/MyFilter";
import cl from "./ExpressionsList.module.scss";
import SideBar from "../../SideBar/SideBar";
import MySpinner from "../../UI/MySpinner/MySpinner";
import FiltersSummary from "./FiltersSummary";
import { useApplyMode } from "../../../hooks/useApplyMode";
import { useEditMode } from "../../../hooks/useEditMode";
import { useFilters } from "../../../hooks/useFilters";
import { useExpressionsByFolders } from "../../../hooks/useExpressionsByFolders";
import EditWindow from "./EditWindow";
import ExpressionItemSimple from "./ExpressionItemSimple";
import BtnIsChecked from "../../UI/Btns/BtnIsChecked";
import ApplyModeFolders from "./ApplyModeFolders";
import { TbListCheck } from "react-icons/tb";
import ProgressColumnFilter from "../../UI/MyProgressBar/ProgressColumnFilter";
import SelectLabel from "../../Labels/SelectLabel";
import FolderFilters from "./FolderFilters";

const ExpressionsListFolders = () => {
  // const [view, setView] = useState(getSettings("listView", 0)); //table or cards
  const editMode = useEditMode();
  const dragDrop = useRef(null);
  const applyMode = useApplyMode();
  const { filters, setFilters } = useFilters();
  const [show, setShow] = useState([]);
  // const modes = {"showProgress" or"showEdit",expression};
  // const [editMode, setEditMode] = useState(null);
  // const [elInfo, setElInfo] = useState("");
  const { expressions, expressionsActions, isLoading } =
    useExpressionsByFolders(applyMode, editMode, filters);

  useEffect(() => {
    expressionsActions.getExpression();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...Object.values(filters)]);

  const filterChange = async (filterObj) => {
    const { filterName, isApply, value } = filterObj;
    if (filterName === "label" && isApply) {
      await expressionsActions.changeExpressionLabels(value);
      return;
    }
    setFilters(filterName, value);
    // if (pageParams.page !== 0) {
    //   setPageParams({ ...pageParams, page: 0 });
    // }
  };

  //drag and drop
  const handleDragStart = (e, item) => {
    dragDrop.current = item;
  };
  const handleDrop = (e, el) => {
    e.preventDefault();
    const item = dragDrop.current;
    if (el.id === item) return;
    expressionsActions.contentEdit({
      id: el.id,
      labelid: item ? item : "",
    });
  };
  const switchFolder = (e, lb) => {
    e.stopPropagation();
    const newVal = show.includes(lb.labelid)
      ? show.filter((el) => el !== lb.labelid)
      : [...show, lb.labelid];
    setShow(newVal);
  };
  const switchChecked = (e, lb) => {
    e.stopPropagation();
    if (applyMode.isOn) applyMode.toggleGroup(lb);
  };
  console.log(expressions);
  // const selectFn = (val, isApl = false) => {
  //   filterChange({ value: val, isApply: isApl, filterName: "label" });
  // };
  return (
    <div className={cl["main-list"]}>
      <SideBar
        applyMode={applyMode}
        handleDragStart={handleDragStart}
        expressionsActions={expressionsActions}
        filterChange={filterChange}
        filters={filters}
      />
      <div className={cl["listContainer"]}>
        {applyMode.isOn ? (
          <ApplyModeFolders
            {...{ applyMode, expressionsActions, expressions }}
          />
        ) : (
          <FolderFilters {...{ filters, applyMode, filterChange }} />
        )}

        {!isLoading && expressions ? (
          <div
            className={
              applyMode.isOn
                ? [cl.listContainer, cl.listApply].join(" ")
                : cl.listContainer
            }>
            {editMode.editElem !== null && (
              <EditWindow
                editMode={editMode}
                expressionsActions={expressionsActions}
              />
            )}

            {expressions.map((lb, i) => (
              <div
                className={cl.oneFolder}
                onClick={(e) => switchFolder(e, lb)}>
                <div className={cl.folderName}>
                  {lb.labelname}
                  {applyMode.isOn && (
                    <BtnIsChecked
                      isChecked={applyMode.isSelectedGr(lb.labelid)}
                      onClick={(e) => switchChecked(e, lb)}
                    />
                  )}
                </div>
                {show.includes(lb.labelid) && (
                  <>
                    {lb.items.map((ex, j) => (
                      <ExpressionItemSimple
                        actions={{ expressionsActions, handleDrop }}
                        expression={ex}
                        modes={{ editMode, applyMode }}
                        num={j}
                      />
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <MySpinner />
        )}
      </div>
    </div>
  );
};

export default ExpressionsListFolders;
