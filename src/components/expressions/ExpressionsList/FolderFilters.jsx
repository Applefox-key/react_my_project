import React from "react";
import ProgressColumnFilter from "../../UI/MyProgressBar/ProgressColumnFilter";
import SelectLabel from "../../Labels/SelectLabel";
import cl from "./ExpressionsList.module.scss";
import { TbListCheck } from "react-icons/tb";
import MyFilter from "../../UI/MyFilter/MyFilter";
import FiltersSummary from "./FiltersSummary";
import { HiOutlineFilter } from "react-icons/hi";

const FolderFilters = ({ filters, applyMode, filterChange }) => {
  const switchApplyMode = (e) => {
    e.stopPropagation();
    applyMode.applyOnOF({
      title: `SELECT PHRASES`,
      btnName: "...",
      btnFn: null,
    });
  };
  const onSelect = (val) =>
    filterChange({
      value: val,
      isApply: false,
      filterName: "label",
    });

  return (
    <div>
      <div className={cl["exressions-list-title"]}>
        <div>
          <MyFilter filter={filters.filter} filterChange={filterChange} />
        </div>{" "}
        <button onClick={switchApplyMode} className="ms-5">
          <TbListCheck />
        </button>
      </div>
      <div className={cl.filtersBox}>
        <div className={cl["exp-row-btns"]}>
          <div className={cl.label_wrap}>
            <SelectLabel
              isOne={true}
              disabled={applyMode.isOn}
              colCat={filters.label}
              onSelect={onSelect}
            />
          </div>
        </div>
        <div>
          <ProgressColumnFilter
            stage={filters.stage}
            filterChange={filterChange}
            small
          />
        </div>
        <HiOutlineFilter />
      </div>
      {(filters.filter || filters.labelid || filters.stage !== null) && (
        <div className={cl["exressions-list-title"]}>
          <FiltersSummary filterChange={filterChange} filters={filters} />
        </div>
      )}
    </div>
  );
};

export default FolderFilters;
