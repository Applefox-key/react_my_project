import React, { useEffect, useState } from "react";
import cl from "./MyFilter.module.scss";
import { CgSearch } from "react-icons/cg";
const MyFilter = ({ filter, filterChange }) => {
  const [value, setValue] = useState(filter);
  useEffect(() => {
    if (filter !== value) setValue(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const setFn = (val) => {
    filterChange({ value: val, filterName: "filter" });
  };
  return (
    <div style={{ position: "relative" }}>
      <div className={cl.container_input}>
        <button
          className={cl.btn}
          onClick={(e) => {
            setFn(value);
          }}>
          {/* 🔎 */}
          <CgSearch />
        </button>
        <input
          type="text"
          placeholder="Search"
          name="text"
          value={value || ""}
          className={cl.input}
          onKeyDown={(e) => {
            if (e.key === "Enter") setFn(value);
          }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />{" "}
      </div>{" "}
      <button
        className={cl.wrap}
        onClick={(e) => {
          setValue("");
          setFn("");
        }}>
        〤{/* <GrFormClose /> */}
      </button>
    </div>
  );
};

export default MyFilter;
