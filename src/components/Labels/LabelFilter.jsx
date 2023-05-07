import React from "react";
import cl from "./Labels.module.scss";

const LabelFilter = ({ filter, setFilter }) => {
  return (
    <div className={cl.filter_input}>
      <input
        type="text"
        onChange={(e) => setFilter(e.target.value.toLowerCase())}
        value={filter}
        autoFocus
        placeholder="type to filter..."
      />
      {filter && (
        <div
          className={cl.filter_btn}
          variant="outline-light"
          onClick={() => setFilter("")}>
          ❌
        </div>
      )}
    </div>
  );
};
export default LabelFilter;
