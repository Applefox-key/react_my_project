import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "../../../hooks/useQuery";
import BaseAPI from "../../../API/BaseAPI";
import MyPagination from "../../UI/MyPagination/MyPagination";
import MyFilter from "../../UI/MyFilter/MyFilter";
import MyToggleBtnGroup from "../../UI/MyToggleBtnGroup";
import { CgMenuGridR, CgMenu } from "react-icons/cg";
import { deleteExpressions, setLabelToArr } from "../../../utils/expressions";
import { usePopup } from "../../../hooks/usePopup";

import ExpressionItem from "./ExpressionItem";
import cl from "./ExpressionsList.module.scss";
import SideBar from "../../SideBar/SideBar";
import MySpinner from "../../UI/MySpinner/MySpinner";

const ExpressionsList = () => {
  const limit = 20;
  const [pageParams, setPageParams] = useState({ page: 1, pageTotal: 1 });
  const [expressions, setExpressions] = useState();
  const [view, setView] = useState(0); //table or cards
  const [editElem, setEditElem] = useState(null);
  const [applyMode, setApplyMode] = useState({
    isOn: false,
    list: [],
    label: "",
  });
  const [filters, setFilters] = useState({
    filter: "",
    labelid: "",
    label: "",
  });
  const setPopup = usePopup();

  const [getExpression, isLoading] = useQuery(async () => {
    if (pageParams.page === 0) {
      const expressions = await BaseAPI.getTrainingListAll(filters);
      setExpressions(expressions);
      const totalSrv = Math.ceil(expressions.length / limit);
      if (totalSrv !== pageParams.pageTotal)
        setPageParams({ ...pageParams, pageTotal: totalSrv });
    } else {
      const [expressions, totalSrv] = await BaseAPI.getTrainingListOnePage(
        limit,
        pageParams.page,
        filters
      );

      setExpressions(expressions);

      if (totalSrv !== pageParams.pageTotal)
        setPageParams({ ...pageParams, pageTotal: totalSrv });
    }
  });

  useEffect(() => {
    getExpression(limit, pageParams.page, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, pageParams.page, filters.filter, filters.labelid]);

  //labels
  const cancelApply = () => setApplyMode({ isOn: false, list: [], label: "" });
  const onSelectLabel = async (value = "", apply = false) => {
    if (apply) {
      setApplyMode({ isOn: true, list: [], label: value });
      return;
    } else {
      setFilters({
        ...filters,
        labelid: value ? value.id : "",
        label: value ? value.name : "",
      });
      if (pageParams.page !== 0) {
        setPageParams({ ...pageParams, page: 0 });
      } else {
        await getExpression(limit, pageParams.page, {
          ...filters,
          labelid: value.id,
        });
      }
    }
  };
  const dragDrop = useRef(null);
  const labelToArr = async () => {
    setLabelToArr(applyMode.list, applyMode.label.id);
    cancelApply();
    if (pageParams.page !== 0) {
      setPageParams({ ...pageParams, page: 0 });
    } else {
      await getExpression(limit, pageParams.page, filters);
    }
  };
  //filter
  const onFilter = async (value = "") => {
    setFilters({ ...filters, filter: value });
    if (pageParams.page !== 0) {
      setPageParams({ ...pageParams, page: 0 });
    } else {
      await getExpression(limit, pageParams.page, filters);
    }
  };
  //edit mode ON-OFF
  const editOn = (content, exp = "") => {
    if (!content) setEditElem(null);
    else
      setEditElem({
        id: content.id,
        phrase: content.phrase,
        expression: content.expression,
        labelid: content.labelid,
        label: content.label,
      });
  };
  //actions
  const expressionsActions = {
    //delete expression
    async expressionsDelete(expression = "") {
      let res = await deleteExpressions(expression);
      if (res.error) {
        setPopup.error("Somethig goes wrong.." + res.error);
        return;
      }
      if (!res) return;
      let arr = expression
        ? expressions.filter((elem) => elem.id !== expression.id)
        : [];
      setExpressions(arr);
    },
    //define expression number
    ordNumber(i) {
      return (
        i + (pageParams.page ? pageParams.page - 1 : pageParams.page) * limit
      );
    },
    ///edit phrase or cancel edit mode
    async contentEdit(newV) {
      //value hasn't been changed
      if (!newV) {
        setEditElem(null);
        return;
      }
      //adding new item has been canceled
      if (newV === "newCancel") {
        setEditElem(null);
        setExpressions(expressions.filter((el) => el.id !== "new"));
        return;
      }
      //add new item
      if (newV.id === "new") {
        try {
          await BaseAPI.createExpression(newV.expression, newV.phrase);
          await getExpression(limit, pageParams.page, filters);
          setEditElem(null);
          setPopup.success("expression was added");
        } catch (error) {
          setPopup.error(error.message);
        }
        return;
      }
      //edit item
      try {
        await BaseAPI.editExpression(newV);
      } catch (error) {
        setPopup.error(error.message);
      }
      setEditElem(null);
      await getExpression(limit, pageParams.page, filters);
    },
    //add new phrase
    async addNew() {
      const newEl = {
        id: "new",
        expression: "",
        phrase: "",
      };
      setExpressions([newEl, ...expressions]);
      editOn(newEl);
    },
    //add prase to the list for applying the label
    addForApply(val) {
      let listAp = applyMode.list.includes(val.id)
        ? [...applyMode.list].filter((el) => el !== val.id)
        : [...applyMode.list, val.id];

      setApplyMode({
        ...applyMode,
        list: listAp,
      });
    },
  };
  const handleDragStart = (e, item) => {
    // e.preventDefault();
    dragDrop.current = item;
  };
  const handleDrop = (e, el) => {
    e.preventDefault();
    const item = dragDrop.current;
    if (!item || el.id === item) return;

    expressionsActions.contentEdit({
      id: el.id,
      labelid: item ? item : "",
    });
  };

  return (
    <div className={cl["main-list"]}>
      <SideBar
        handleDragStart={handleDragStart}
        setExpressions={setExpressions}
        addOne={expressionsActions.addNew}
        onSelectLabel={onSelectLabel}
        selectedid={filters.labelid}
      />
      <div className={cl["listContainer"]}>
        <div className={cl["exressions-list-title"]}>
          <MyFilter filter={filters.filter} setFilter={onFilter} />{" "}
          <div className={cl["filter-summary"]}>
            {applyMode.isOn ? (
              <span>
                {` SELECT PHRASES FOR LABEL ${applyMode.label.name} AND PRESS
                APPLY`}
              </span>
            ) : (
              <div>
                {filters.label && (
                  <button onClick={() => onSelectLabel("")}>
                    🗙{filters.label}
                  </button>
                )}
                {filters.filter && (
                  <button onClick={() => onFilter("")}>
                    🗙 {filters.filter}
                  </button>
                )}
              </div>
            )}
          </div>
          <div>
            <MyToggleBtnGroup
              arr={[<CgMenu />, <CgMenuGridR />]}
              checked={view}
              name={"md"}
              onChange={(e) => {
                setView(e.target.value - 1);
              }}
            />
          </div>
        </div>{" "}
        {applyMode.isOn && (
          <div className={cl.applyBtn}>
            <button onClick={labelToArr}>APPLY</button>
            <button onClick={cancelApply}>CANCEL</button>
          </div>
        )}
        {!isLoading && expressions ? (
          <>
            <MyPagination
              pageParams={pageParams}
              setPageParams={setPageParams}
            />

            <ExpressionItem
              handleDrop={handleDrop}
              expressions={expressions}
              editElem={editElem}
              expressionsActions={expressionsActions}
              editOn={editOn}
              view={view}
              applyMode={applyMode}
            />
          </>
        ) : (
          <MySpinner />
        )}
      </div>
    </div>
  );
};

export default ExpressionsList;
