import { useState } from "react";
import BaseAPI from "../API/BaseAPI";
import { createFilesData } from "../utils/files";
import {
  deleteExpressions,
  deleteSomeExpressions,
  setLabelToArr,
} from "../utils/expressions";
import { usePopup } from "./usePopup";

export const useExpressions = (applyMode, editMode, filters) => {
  const limit = 20;
  const [expressions, setExpressions] = useState([]);
  const [pageParams, setPageParams] = useState({ page: 1, pageTotal: 1 });
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const setPopup = usePopup();

  //actions with expressions
  const expressionsActions = {
    async getExpression() {
      try {
        setIsLoading(true);
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
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    //group change expressions labels
    async changeExpressionLabels(value) {
      const valName = value ? value.name : "REMOVING";
      //set label to the expression
      const labelToArr = async (data) => {
        setLabelToArr(data.list, data.label.id);
        applyMode.applyOnOF();
        if (pageParams.page !== 0) {
          setPageParams({ ...pageParams, page: 0 });
        } else {
          await this.getExpression();
        }
      };
      applyMode.applyOnOF({
        label: value,
        btnName: "APPLY",
        btnFn: labelToArr,
        title: ` SELECT PHRASES FOR LABEL ${valName} AND PRESS  APPLY`,
      });
    },

    async downloadMode() {
      //download expressions
      const createFile = (data) => {
        const selectedList = createFilesData(
          expressions.filter((el) => data.list.includes(el.id))
        );
        const fileURL = window.URL.createObjectURL(selectedList);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = "expressions.txt";
        link.click();
        link.remove();
        applyMode.applyOnOF();
      };
      applyMode.applyOnOF({
        title: `SELECT PHRASES TO DOWNLOAD AND PRESS THE BUTTON`,
        btnName: "GET",
        btnFn: createFile,
      });
    },
    //apply mode for deleting
    async deleteMode() {
      const deleteSome = async (data) => {
        const ids = data.list;
        let res = await deleteSomeExpressions(ids);
        if (res.error) {
          setPopup.error("Something goes wrong.." + res.error);
          return;
        }
        if (!res) return;
        let arr = expressions.filter((elem) => !ids.includes(elem.id));
        setExpressions(arr);
        applyMode.applyOnOF();
      };
      applyMode.applyOnOF({
        title: `SELECT PHRASES TO DELETE AND PRESS DELETE`,
        btnName: "DELETE",
        btnFn: deleteSome,
      });
    },
    //delete some expression
    async deleteSome(data) {
      const ids = data.list;
      let res = await deleteSomeExpressions(ids);
      if (res.error) {
        setPopup.error("Something goes wrong.." + res.error);
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
        editMode.setEdit(null);
        return;
      }
      //adding new item has been canceled
      if (newV === "newCancel") {
        editMode.setEdit(null);
        setExpressions(expressions.filter((el) => el.id !== "new"));
        return;
      }
      //add new item
      if (newV.id === "new") {
        try {
          await BaseAPI.createExpression(newV.expression, newV.phrase);
          await this.getExpression();
          editMode.setEdit(null);
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
      editMode.setEdit(null);
      await this.getExpression();
    },
    //add new phrase
    async addNew() {
      const newEl = {
        id: "new",
        expression: "",
        phrase: "",
      };
      setExpressions([newEl, ...expressions]);
      editMode.setEdit(newEl);
    },
    setExpressions,
  };
  return {
    expressions,
    pageParams,
    setPageParams,
    isLoading,
    expressionsActions,
  };
};
