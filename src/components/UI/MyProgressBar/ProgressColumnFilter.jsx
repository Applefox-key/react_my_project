import React, { useEffect, useState } from "react";
import cl from "./ProgressColumn.module.scss";
import { RiFilterOffLine } from "react-icons/ri";

const ProgressColumnFilter = ({ stage = 0, filterChange }) => {
  const pr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [value, setValue] = useState(stage);

  useEffect(() => {
    if (stage !== value) setValue(stage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const selectFn = (val) => {
    setValue(val);
    filterChange({ value: val, filterName: "stage" });
  };
  return (
    <>
      <h2 className="w-100">PROGRESS FILTER</h2>
      <div className="unfilter-wrap">
        <div className={cl.wrapProgressLG} value=" filter by progress">
          <div
            onClick={(e) => {
              selectFn(0);
            }}
            key={"zero"}
            className={[0 !== value ? cl.oneStage0 : cl.oneStage, cl.lg].join(
              " "
            )}>
            0
          </div>
          {pr.map((el) => (
            <div
              key={el}
              onClick={(e) => {
                selectFn(el);
              }}
              className={[el > value ? cl.oneStage0 : cl.oneStage, cl.lg].join(
                " "
              )}></div>
          ))}
        </div>{" "}
        {stage !== null && (
          <button
            className={"btnPlus"}
            title="clear filter"
            onClick={(e) => {
              selectFn(null);
            }}>
            <RiFilterOffLine />
          </button>
        )}
      </div>
    </>
  );
};

export default ProgressColumnFilter;
