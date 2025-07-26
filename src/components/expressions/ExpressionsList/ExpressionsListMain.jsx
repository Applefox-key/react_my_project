import React, { useEffect, useMemo, useRef, useState } from "react";
import SideBar from "../../SideBar/SideBar";
import MySpinner from "../../UI/MySpinner/MySpinner";
import { useApplyMode } from "../../../hooks/useApplyMode";
import { useEditMode } from "../../../hooks/useEditMode";
import { useFilters } from "../../../hooks/useFilters";
import EditWindow from "./ModalPartsExpression/EditWindow";
import ExpressionItemSimple from "./ExpressionItemSimple";
import ApplyModeFolders from "./ApplyMode/ApplyModeFolders";
import FolderFilters from "./ExpressionFilters/FolderFilters";
import cl from "./ExpressionsList.module.scss";
import { useExpressionsMain } from "../../../hooks/useExpressionsMain";
import { groupByLabel } from "../../../utils/expressions";
import ExpressionGroupBlock from "./ExpressionGroupBlock";

const ExpressionsListMain = () => {
  const editMode = useEditMode();
  const dragDrop = useRef(null);
  const applyMode = useApplyMode();
  const { filters, setFilters } = useFilters();
  const [show, setShow] = useState([]);
  const [byTags, setByTags] = useState(false);
  const { expressions, expressionActions, isLoading } = useExpressionsMain(
    applyMode,
    editMode,
    filters
  );

  useEffect(() => {
    expressionActions.fetchExpressions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...Object.values(filters)]);

  const filterChange = async (filterObj) => {
    const { filterName, isApply, value } = filterObj;
    if (filterName === "label" && isApply) {
      await expressionActions.changeExpressionLabels(value);
      return;
    }
    setFilters(filterName, value);
  };

  const handleDragStart = (e, item) => {
    dragDrop.current = item;
  };

  const handleDrop = (e, el) => {
    e.preventDefault();
    const item = dragDrop.current;
    if (el.id === item) return;
    expressionActions.contentEdit({
      id: el.id,
      labelid: item ? item : "",
    });
  };

  const switchFolder = (e, lb) => {
    e.stopPropagation();
    const updatedData = show.includes(lb.labelid)
      ? show.filter((el) => el !== lb.labelid)
      : [...show, lb.labelid];
    setShow(updatedData);
  };

  const switchChecked = (e, lb) => {
    e.stopPropagation();
    if (applyMode.isOn) applyMode.toggleGroup(lb);
  };

  // tag groups
  const grouped = useMemo(
    () => (byTags ? groupByLabel(expressions) : []),
    [expressions, byTags]
  );

  const listToRender = byTags ? grouped : expressions;

  return (
    <div className={cl["main-list"]}>
      <SideBar
        applyMode={applyMode}
        handleDragStart={handleDragStart}
        expressionActions={expressionActions}
        filterChange={filterChange}
        filters={filters}
      />
      <div className={cl["sideWrap"]}>
        {applyMode.isOn ? (
          <ApplyModeFolders
            {...{
              applyMode,
              expressionActions,
              expressions,
            }}
          />
        ) : (
          <FolderFilters
            {...{ filters, applyMode, filterChange, byTags, setByTags }}
          />
        )}
        {editMode.editElem !== null && (
          <EditWindow
            editMode={editMode}
            expressionActions={expressionActions}
          />
        )}
        {!isLoading ? (
          <div
            className={
              applyMode.isOn
                ? [cl.listContainer, cl.listApply].join(" ")
                : cl.listContainer
            }>
            {byTags ? (
              listToRender.map((lb) => (
                <ExpressionGroupBlock
                  key={lb.labelid}
                  group={lb}
                  isShown={show.includes(lb.labelid)}
                  toggleShow={switchFolder}
                  onCheck={switchChecked}
                  actions={{ expressionActions, handleDrop }}
                  modes={{ editMode, applyMode }}
                />
              ))
            ) : (
              <div className={cl.oneFolder}>
                {listToRender.map((ex, j) => (
                  <ExpressionItemSimple
                    key={ex.id}
                    actions={{ expressionActions, handleDrop }}
                    expression={ex}
                    modes={{ editMode, applyMode }}
                    num={j}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <MySpinner />
        )}
      </div>
    </div>
  );
};
export default ExpressionsListMain;
