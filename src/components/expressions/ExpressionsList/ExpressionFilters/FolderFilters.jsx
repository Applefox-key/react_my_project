import React, { useState } from "react";
import ProgressColumnFilter from "../../../UI/MyProgressBar/ProgressColumnFilter";
import SelectLabel from "../../../Labels/SelectLabel";
import cl from "../ExpressionsList.module.scss";
import { TbListCheck } from "react-icons/tb";
import MyFilter from "../../../UI/MyFilter/MyFilter";
import FiltersSummary from "./FiltersSummary";
import { HiOutlineFilter } from "react-icons/hi";
import { statusArr } from "../../../../constants/statusConst";
import DropDownList from "../../../UI/DropDownList/DropDownList";

import { BsFolder, BsFolderCheck } from "react-icons/bs";
import MyPortal from "../../../UI/MyPortal/MyPortal";
import useMediaQuery from "../../../../hooks/UseMediaQuery";
const FolderFilters = ({
  filters,
  applyMode,
  filterChange,
  byTags,
  setByTags,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const switchApplyMode = (e) => {
    e.stopPropagation();
    applyMode.applyOnOF({
      title: `SELECT PHRASES`,
      btnName: "...",
      btnFn: null,
    });
  };
  const switchByTags = (e) => {
    e.stopPropagation();
    setByTags(!byTags);
  };
  const onSelect = (val) =>
    filterChange({
      value: val,
      isApply: false,
      filterName: "label",
    });
  const statusFilter = (val) => {
    filterChange({
      value: val === "all (status)" ? null : val,
      isApply: false,
      filterName: "status",
    });
  };
  const inQueueFilter = (val) =>
    filterChange({
      value: val === "all (queue)" ? null : val === "in the queue",
      isApply: false,
      filterName: "inQueue",
    });
  return (
    <div className={cl.filtersLine}>
      <div className={cl["exressions-list-title"]}>
        <div>
          {isMobile ? (
            <MyPortal containerId="side-bar-portal">
              <MyFilter filter={filters.filter} filterChange={filterChange} />
            </MyPortal>
          ) : (
            <MyFilter filter={filters.filter} filterChange={filterChange} />
          )}
        </div>

        <div className={cl.btnsm}>
          <button
            onClick={switchByTags}
            title="show by tags"
            className={byTags ? cl.byTagBtn : ""}>
            {/* {`${byTags ? "🗹" : "☐"} show by tags`} */}
            {/* {byTags ? <FaRegCheckSquare /> : <FaRegSquare />} show by tags */}
            {byTags ? <BsFolderCheck /> : <BsFolder />} show by tags
          </button>

          <button
            onClick={(e) => setShowFilters(!showFilters)}
            className={showFilters ? cl.activeFilterBtn : ""}
            title="open filter">
            <HiOutlineFilter />
          </button>
          <button onClick={switchApplyMode} title="select expressions">
            <TbListCheck />
          </button>
        </div>
      </div>
      {showFilters && (
        <div className={cl.filtersBox}>
          <div className={cl.filterStatus}>
            <DropDownList
              className="me-3"
              val={
                filters.inQueue === null
                  ? "all (queue)"
                  : filters.inQueue
                  ? "in the queue"
                  : "not in the queue"
              }
              onValueChange={inQueueFilter}
              list={["all (queue)", "in the queue", "not in the queue"]}
            />
            <DropDownList
              val={filters.status === null ? "all (status)" : filters.status}
              onValueChange={statusFilter}
              list={["all (status)", ...statusArr]}
            />
          </div>
          <div className={cl.filterInfo}>
            <div className={cl["exp-row-btns"]}>
              <div className={cl.label_wrap}>
                <SelectLabel
                  formForSet
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
          </div>
        </div>
      )}
      {Object.values(filters).some((val) => val !== null && val !== "") && (
        <FiltersSummary filterChange={filterChange} filters={filters} />
      )}{" "}
      {/* <div>
        <FilterLS filter={filters.filter} filterChange={filterChange} />
      </div> */}
    </div>
  );
};

export default FolderFilters;
