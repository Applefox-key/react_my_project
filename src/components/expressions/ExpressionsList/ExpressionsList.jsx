import React, { useState, useEffect, useRef } from "react";
import MyPagination from "../../UI/MyPagination/MyPagination";
import MyFilter from "../../UI/MyFilter/MyFilter";
import MyToggleBtnGroup from "../../UI/MyToggleBtnGroup";
import { CgMenuGridR } from "react-icons/cg";
import ExpressionItem from "./ExpressionItem";
import cl from "./ExpressionsList.module.scss";
import SideBar from "../../SideBar/SideBar";
import MySpinner from "../../UI/MySpinner/MySpinner";
import ApplyPannel from "./ApplyPannel";
import FiltersSummary from "./FiltersSummary";
import { CiViewTable } from "react-icons/ci";
import { getSettings, setSettings } from "../../../utils/settings";
import { useApplyMode } from "../../../hooks/useApplyMode";
import { useEditMode } from "../../../hooks/useEditMode";
import { useFilters } from "../../../hooks/useFilters";
import { useExpressions } from "../../../hooks/useExpressions";

const ExpressionsList = () => {
  const [view, setView] = useState(getSettings("listView", 0)); //table or cards
  const editMode = useEditMode();
  const dragDrop = useRef(null);
  const applyMode = useApplyMode();
  const { filters, setFilters } = useFilters();
  const {
    expressions,
    expressionsActions,
    pageParams,
    setPageParams,
    isLoading,
  } = useExpressions(applyMode, editMode, filters);

  useEffect(() => {
    expressionsActions.getExpression();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParams.page, ...Object.values(filters)]);

  const filterChange = async (filterObj) => {
    const { filterName, isApply, value } = filterObj;
    if (filterName === "label" && isApply) {
      await expressionsActions.changeExpressionLabels(value);
      return;
    }
    setFilters(filterName, value);
    if (pageParams.page !== 0) {
      setPageParams({ ...pageParams, page: 0 });
    }
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
  const toggleBtnHandle = (e) => {
    setSettings("listView", e.target.value - 1);
    setView(e.target.value - 1);
  };
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
          <ApplyPannel
            applyMode={applyMode}
            checkAll={() => applyMode.selectAllApply(expressions)}
          />
        ) : (
          <div className={cl["exressions-list-title"]}>
            <div>
              <MyFilter filter={filters.filter} filterChange={filterChange} />
            </div>

            <MyPagination
              pageParams={pageParams}
              setPageParams={setPageParams}
            />
            <div className={cl.viewSwitcher}>
              <MyToggleBtnGroup
                arr={[<CgMenuGridR />, <CiViewTable />]}
                checked={view}
                name={"md"}
                onChange={toggleBtnHandle}
              />
            </div>
          </div>
        )}
        <div className={cl["exressions-list-title"]}>
          {(filters.filter || filters.labelid || filters.stage !== null) && (
            <FiltersSummary filterChange={filterChange} filters={filters} />
          )}
        </div>
        {!isLoading && expressions ? (
          <ExpressionItem
            modes={{ editMode, view, applyMode }}
            actions={{ expressionsActions, handleDrop }}
            expressions={expressions}
          />
        ) : (
          <MySpinner />
        )}
      </div>
    </div>
  );
};

export default ExpressionsList;
