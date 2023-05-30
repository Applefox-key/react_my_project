import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "../../../hooks/useQuery";
import BaseAPI from "../../../API/BaseAPI";
import MyPagination from "../../UI/MyPagination/MyPagination";
import MyFilter from "../../UI/MyFilter/MyFilter";
import MyToggleBtnGroup from "../../UI/MyToggleBtnGroup";
import { CgMenuGridR, CgMenu } from "react-icons/cg";
import {
  deleteExpressions,
  deleteSomeExpressions,
  setLabelToArr,
} from "../../../utils/expressions";
import { usePopup } from "../../../hooks/usePopup";

import ExpressionItem from "./ExpressionItem";
import cl from "./ExpressionsList.module.scss";
import SideBar from "../../SideBar/SideBar";
import MySpinner from "../../UI/MySpinner/MySpinner";
import ApplyPannel from "./ApplyPannel";
import FiltersSummary from "./FiltersSummary";
import { CiViewTable } from "react-icons/ci";

const ExpressionsList = () => {
  const limit = 20;
  const [pageParams, setPageParams] = useState({ page: 1, pageTotal: 1 });
  const [expressions, setExpressions] = useState();
  const [view, setView] = useState(0); //table or cards
  const [editElem, setEditElem] = useState(null);
  const setPopup = usePopup();
  const dragDrop = useRef(null);
  const [applyMode, setApplyMode] = useState({
    isOn: false,
    list: [],
    label: "",
    title: "",
    btnName: "",
    btnFn: "",
  });
  const [filters, setFilters] = useState({
    filter: "",
    labelid: "",
    label: "",
    stage: "",
  });

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
  }, [limit, pageParams.page, filters.filter, filters.labelid, filters.stage]);

  const filterChange = async (filterObj) => {
    const { filterName, isApply, value } = filterObj;
    if (filterName === "label") {
      const valName = value ? value.name : "REMOVING";
      if (isApply) {
        applyOnOF({
          label: value,
          btnName: "APPLY",
          btnFn: labelToArr,
          title: ` SELECT PHRASES FOR LABEL ${valName} AND PRESS  APPLY`,
        });
        return;
      } else {
        const newFilters = {
          ...filters,
          labelid: value ? value.id : "",
          label: value ? value.name : "",
        };
        setFilters(newFilters);
      }
    } else {
      setFilters({ ...filters, [filterName]: value });
    }
    if (pageParams.page !== 0) {
      setPageParams({ ...pageParams, page: 0 });
    }
  };

  //set label to the expression
  const labelToArr = async (data) => {
    setLabelToArr(data.list, data.label.id);
    applyOnOF();
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
  }; //apply mode ON-OFF
  const applyOnOF = (obj = {}) => {
    setApplyMode({
      isOn: !!obj.btnName,
      list: [],
      label: "",
      title: "",
      btnName: "",
      btnFn: "",
      checkAll: false,
      ...obj,
    });
  };
  //apply mode check all or nothing
  const checkAll = () => {
    const value = !applyMode.checkAll;
    setApplyMode({
      ...applyMode,
      checkAll: value,
      list: value ? expressions.map((el) => el.id) : [],
    });
  };
  //actions with expressions
  const expressionsActions = {
    //apply mode for deleting
    async deleteMode() {
      applyOnOF({
        title: `SELECT PHRASES TO DELETE AND PRESS DELETE`,
        btnName: "DELETE",
        btnFn: expressionsActions.deleteSome,
      });
    }, //delete some expression
    async deleteSome(data) {
      const ids = data.list;
      let res = await deleteSomeExpressions(ids);
      if (res.error) {
        setPopup.error("Somethig goes wrong.." + res.error);
        return;
      }
      if (!res) return;
      let arr = expressions.filter((elem) => !ids.includes(elem.id));
      setExpressions(arr);
    },
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
  //drag and drop
  const handleDragStart = (e, item) => {
    // e.preventDefault();
    dragDrop.current = item;
  };
  const handleDrop = (e, el) => {
    e.preventDefault();

    const item = dragDrop.current;
    if (el.id === item) return;

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
        expressionsActions={expressionsActions}
        filterChange={filterChange}
        filters={filters}
      />
      <div className={cl["listContainer"]}>
        {applyMode.isOn ? (
          <ApplyPannel
            checkAll={checkAll}
            applyMode={applyMode}
            applyOnOF={applyOnOF}
          />
        ) : (
          <div className={cl["exressions-list-title"]}>
            <div>
              <MyFilter filter={filters.filter} filterChange={filterChange} />
            </div>
            {(filters.filter || filters.labelid || filters.stage) && (
              <FiltersSummary filterChange={filterChange} filters={filters} />
            )}
            <div className={cl.viewSwitcher}>
              <MyToggleBtnGroup
                arr={[<CgMenu />, <CgMenuGridR />, <CiViewTable />]}
                checked={view}
                name={"md"}
                onChange={(e) => {
                  setView(e.target.value - 1);
                }}
              />
            </div>
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
