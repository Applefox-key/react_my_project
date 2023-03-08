import React, { useState, useEffect } from "react";
import { useQuery } from "../../hooks/useQuery";

import MyTable from "../UI/table/MyTable";
import ExpressionInfo from "./ExpressionInfo";
import MySpinner from "../UI/MySpinner";
import BaseAPI from "../../API/BaseAPI";

import ExpressionsMenu from "./ExpressionsMenu";
import { usePopup } from "../../hooks/usePopup";
import MyPagination from "../UI/AnimatedBtn/MyPagination/MyPagination";
import { deleteExpressions } from "../../utils/expressions";
import { CSSTransition } from "react-transition-group";

const ExpressionsList = () => {
  const limit = 10;
  const setPopup = usePopup();
  const [expressions, setExpressions] = useState();
  const [dataModal, setDataModal] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [getExpression, isLoading] = useQuery(async () => {
    if (page === 0) {
      const expressions = await BaseAPI.getTrainingListAll();
      setExpressions(expressions);
    } else {
      const [expressions, totalSrv] = await BaseAPI.getTrainingListOnePage(
        limit,
        page
      );
      setExpressions(expressions);
      if (totalSrv !== pageTotal) setPageTotal(totalSrv);
    }
  });

  useEffect(() => {
    getExpression(limit, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page]);

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
  //actions
  const expressionsDelete = async (expression = "") => {
    let res = deleteExpressions(expression);
    if (res.error) {
      setPopup.error("Somethig goes wrong.." + res.error);
      return;
    }
    let arr = expression
      ? expressions.filter((elem) => elem.id !== expression.id)
      : [];
    setExpressions(arr);
  };

  const editOn = (content) => {
    setEditMode({
      content: content,
      names: ["expression", "phrase"],
      edit: contentEdit,
    });
  };
  const contentEdit = async (newV) => {
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
        await getExpression(limit, page);
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
    await getExpression(limit, page);
  };
  const addRow = async () => {
    const newEl = {
      id: "new",
      expression: "",
      phrase: "",
    };
    setExpressions([newEl, ...expressions]);
    editOn(newEl);
  };
  const btnsArray = [
    { nameMain: "Add row", callback: addRow },
    { nameMain: "Delete all", callback: expressionsDelete },
    { name: "Plan", callback: modalExpressionInfo },
    { name: "Delete", callback: expressionsDelete },
  ];
  return (
    <div className="mt-3 tableContainer">
      {dataModal ? dataModal : <></>}
      <ExpressionsMenu setExpressions={setExpressions} addOne={addRow} />

      {!isLoading ? (
        <>
          <MyPagination
            total={pageTotal}
            activeItem={page}
            setActive={setPage}></MyPagination>{" "}
          {editMode && (
            <div className="divAdvice">
              YOU CAN SELECT A PART OF A PHRASE AND SET IT AS AN EXPRESSION. THE
              EXPRESSION WILL BE HIGHLIGHTED DURING TRAINING.
            </div>
          )}
          <CSSTransition
            appear={true}
            in={true}
            timeout={2000}
            classNames="page">
            <MyTable
              edit={editMode}
              dataArray={expressions}
              namesArray={["expression", "phrase", "stage"]}
              onRowClick={editOn}
              btnsArray={btnsArray}
            />
          </CSSTransition>
        </>
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default ExpressionsList;
