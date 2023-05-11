import React, { useEffect, useState } from "react";
import cl from "./MyFilter.module.css";

const MyFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  useEffect(() => {
    if (filter !== value) setValue(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  return (
    <div style={{ position: "relative" }}>
      <div className={cl.container_input}>
        <button
          className={cl.btn}
          onClick={(e) => {
            setFilter(value);
          }}>
          🔎
        </button>
        <input
          type="text"
          placeholder="Search"
          name="text"
          value={value}
          className={cl.input}
          onKeyDown={(e) => {
            if (e.key === "Enter") setFilter(value);
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
          setFilter("");
        }}>
        〤
      </button>
    </div>
  );
};

export default MyFilter;
