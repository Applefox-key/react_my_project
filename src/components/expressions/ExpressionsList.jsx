import React, { useState, useEffect } from "react";
import { useQuery } from "../../hooks/useQuery";
import ExpressionInfo from "./ExpressionInfo";
import MySpinner from "../UI/MySpinner";
import BaseAPI from "../../API/BaseAPI";
import ExpressionsMenu from "./ExpressionsMenu";
import MyPagination from "../UI/MyPagination/MyPagination";
import MyFilter from "../UI/MyFilter/MyFilter";
import ExpressionsTable from "./ExpressionsTable";
import MyToggleBtnGroup from "../UI/MyToggleBtnGroup";
import ExpressionsCards from "./ExpressionsCards";
import { deleteExpressions } from "../../utils/expressions";
import { usePopup } from "../../hooks/usePopup";

const ExpressionsList = () => {
  const limit = 20;
  const [expressions, setExpressions] = useState();
  const [view, setView] = useState(0);
  const [dataModal, setDataModal] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [pageTotal, setPageTotal] = useState(1);
  const [getExpression, isLoading] = useQuery(async () => {
    if (page === 0) {
      const expressions = await BaseAPI.getTrainingListAll(filter);
      setExpressions(expressions);
      const totalSrv = Math.ceil(expressions.length / limit);
      if (totalSrv !== pageTotal) setPageTotal(totalSrv);
    } else {
      const [expressions, totalSrv] = await BaseAPI.getTrainingListOnePage(
        limit,
        page,
        filter
      );
      setExpressions(expressions);
      if (totalSrv !== pageTotal) setPageTotal(totalSrv);
    }
  });
  const [editMode, setEditMode] = useState(null);
  const setPopup = usePopup();
  useEffect(() => {
    getExpression(limit, page, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, filter]);
  //filter
  const onFilter = async (value) => {
    setFilter(value);
    if (page !== 0) {
      setPage(0);
    } else {
      await getExpression(limit, page, filter);
    }
  };
  //modal content
  const modalExpressionInfo = (expression) => {
    setDataModal(
      <ExpressionInfo
        visible={true}
        setVisible={setDataModal}
        expression={expression}
      />
    );
  };

  const editOn = (content) => {
    if (!content) setEditMode(null);
    else
      setEditMode(
        view === 1
          ? {
              id: content.id,
              phrase: content.phrase,
              expression: content.expression,
            }
          : {
              content: content,
              names: ["expression", "phrase"],
              edit: expressionsActions.contentEdit,
            }
      );
  };
  const expressionsActions = {
    //actions
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

    async contentEdit(newV) {
      //value hasn't been changed
      if (!newV) {
        setEditMode(null);
        return;
      }
      //adding new item has been canceled
      if (newV === "newCancel") {
        setEditMode(null);
        setExpressions(expressions.filter((el) => el.id !== "new"));
        return;
      }
      //add new item
      if (newV.id === "new") {
        try {
          await BaseAPI.createExpression(newV.expression, newV.phrase);
          await getExpression(limit, page, filter);
          setEditMode(null);
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
      setEditMode(null);
      await getExpression(limit, page, filter);
    },

    async addNew() {
      const newEl = {
        id: "new",
        expression: "",
        phrase: "",
      };
      if (view === 0) setExpressions([newEl, ...expressions]);
      editOn(newEl);
    },
  };

  return (
    <div className="mt-3 tableContainer">
      {dataModal ? dataModal : <></>}
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <ExpressionsMenu
          setExpressions={setExpressions}
          addOne={expressionsActions.addNew}
        />
        <div>
          <MyFilter filter={filter} setFilter={onFilter} />
        </div>
      </div>
      {!isLoading ? (
        <>
          <MyPagination
            total={pageTotal}
            activeItem={page}
            setActive={setPage}></MyPagination>{" "}
          <br />
          <MyToggleBtnGroup
            arr={["table", "cards"]}
            checked={view}
            name={"md"}
            onChange={(e) => {
              setView(e.target.value - 1);
            }}
          />
          {view === 0 ? (
            <ExpressionsTable
              expressions={expressions}
              modalExpressionInfo={modalExpressionInfo}
              editMode={editMode}
              expressionsActions={expressionsActions}
              editOn={editOn}
            />
          ) : (
            <ExpressionsCards
              expressions={expressions}
              editMode={editMode}
              expressionsActions={expressionsActions}
              editOn={editOn}
            />
          )}
        </>
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default ExpressionsList;
