import React from "react";
import cl from "./ExpressionsList.module.scss";
import { MdClear } from "react-icons/md";
const FiltersSummary = ({ filters, filterChange }) => {
  const clearFn = (name) => {
    filterChange({
      value: "",
      isApply: false,
      filterName: name,
    });
  };
  return (
    <div className={cl["filter-summary"]}>
      {filters.label && (
        <button onClick={() => clearFn("label")}>
          {<MdClear className="" />} label: {filters.label}
        </button>
      )}
      {filters.filter && (
        <button onClick={() => clearFn("filter")}>
          {<MdClear className="" />} text: {filters.filter}
        </button>
      )}
      {filters.stage !== "" && (
        <button onClick={() => clearFn("stage")}>
          {<MdClear className="" />} progress: {filters.stage}
        </button>
      )}
    </div>
  );
};

export default FiltersSummary;
