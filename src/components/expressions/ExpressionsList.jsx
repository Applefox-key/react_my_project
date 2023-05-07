import React, { useState, useEffect } from "react";
import { useQuery } from "../../hooks/useQuery";
import MySpinner from "../UI/MySpinner";
import BaseAPI from "../../API/BaseAPI";
import MyPagination from "../UI/MyPagination/MyPagination";
import MyFilter from "../UI/MyFilter/MyFilter";
import MyToggleBtnGroup from "../UI/MyToggleBtnGroup";
import { CgMenuGridR, CgMenu } from "react-icons/cg";
import { deleteExpressions } from "../../utils/expressions";
import { usePopup } from "../../hooks/usePopup";

import ExpressionRows from "./ExpressionRows";
import cl from "./ExpressionsList.module.scss";
import SideBar from "../SideBar/SideBar";

const ExpressionsList = () => {
  const limit = 20;
  const [pageParams, setPageParams] = useState({ page: 1, pageTotal: 1 });
  const [expressions, setExpressions] = useState();

  const [view, setView] = useState(0); //table or cards
  const [filters, setFilters] = useState({
    filter: "",
    labelid: "",
    label: "",
  });
  const [editElem, setEditElem] = useState(null);
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

  //filter
  const onFilter = async (value = "") => {
    setFilters({ ...filters, filter: value });
    if (pageParams.page !== 0) {
      setPageParams({ ...pageParams, page: 0 });
    } else {
      await getExpression(limit, pageParams.page, filters);
    }
  };
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

    // setEditMode(
    //   view === 1
    //     ? {
    //         exp: exp ? exp : content,
    //         obj: {
    //           id: content.id,
    //           phrase: content.phrase,
    //           expression: content.expression,
    //           labelid: content.labelid,
    //           label: content.label,
    //         },
    //       }
    //     : {
    //         content: content,
    //         names: ["expression", "phrase"],
    //         edit: expressionsActions.contentEdit,
    //       }
    // );
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

    async addNew() {
      const newEl = {
        id: "new",
        expression: "",
        phrase: "",
      };
      setExpressions([newEl, ...expressions]);
      editOn(newEl);
    },
  };

  const onSelectLabel = async (value = "") => {
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
  };

  console.log(expressions);
  return (
    <div className={cl["main-list"]}>
      <SideBar
        setExpressions={setExpressions}
        addOne={expressionsActions.addNew}
        onSelectLabel={onSelectLabel}
        selectedid={filters.labelid}
      />
      <div className={cl["listContainer"]}>
        <div className={cl["exressions-list-title"]}>
          <MyFilter filter={filters.filter} setFilter={onFilter} />{" "}
          <div className={cl["filter-summary"]}>
            {filters.label && (
              <button onClick={() => onSelectLabel("")}>
                🗙{filters.label}
              </button>
            )}
            {filters.filter && (
              <button onClick={() => onFilter("")}>🗙 {filters.filter}</button>
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
        </div>

        {!isLoading && expressions ? (
          <>
            <MyPagination
              pageParams={pageParams}
              setPageParams={setPageParams}
            />
            <ExpressionRows
              expressions={expressions}
              editElem={editElem}
              expressionsActions={expressionsActions}
              editOn={editOn}
              view={view}
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
