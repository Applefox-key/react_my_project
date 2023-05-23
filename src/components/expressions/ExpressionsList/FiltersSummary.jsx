import React from "react";
import cl from "./ExpressionsList.module.scss";
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
          {" "}
          🗙 label: {filters.label}
        </button>
      )}
      {filters.filter && (
        <button onClick={() => clearFn("filter")}>
          🗙 text: {filters.filter}
        </button>
      )}
      {filters.stage !== "" && (
        <button onClick={() => clearFn("stage")}>
          🗙 progress: {filters.stage}
        </button>
      )}
    </div>
  );
};

export default FiltersSummary;
