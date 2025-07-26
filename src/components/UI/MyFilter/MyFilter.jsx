import React, { useEffect, useState } from "react";
import cl from "./MyFilter.module.scss";
import { CgSearch } from "react-icons/cg";
import Swal from "sweetalert2";

const MyFilter = ({ filter, filterChange }) => {
  const [value, setValue] = useState(filter);
  useEffect(() => {
    if (filter !== value) setValue(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const setFn = (val) => {
    filterChange({ value: val, filterName: "filter" });
  };
  const showHide = async (e, value) => {
    e.stopPropagation();
    if (window.screen.availWidth <= 600) {
      // const textInp = prompt("what do you want to find?", "");
      // if (textInp) filterChange(textInp);
      const { value: textInp } = await Swal.fire({
        title: "What do you want to find?",
        input: "text",
        inputPlaceholder: "please print your text...",
        showCancelButton: true,
        confirmButtonText: "Find",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        inputValidator: (value) => {
          if (!value) return;
        },
      });

      if (textInp) setFn(textInp);
      return;
    }
    setFn(value);
  };
  return (
    <div className={cl.short}>
      <div className={cl.container_input}>
        <button className={cl.btn} onClick={(e) => showHide(e, value)}>
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
        />
      </div>
      <button
        className={cl.wrap}
        onClick={(e) => {
          setValue("");
          setFn("");
        }}>
        〤
      </button>
    </div>
  );
};

export default MyFilter;
