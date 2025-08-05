import { useState } from "react";
import BaseAPI from "../API/BaseAPI";
import { createFilesData } from "../utils/files";
import {
  deleteExpressions,
  deleteSomeExpressions,
  setFieldArr,
} from "../utils/expressions";
import { usePopup } from "./usePopup";
import { Expression } from "../classes/Expression";

export const useExpressionsMain = (applyMode, editMode, filters) => {
  const [expressions, setExpressions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const setPopup = usePopup();

  const expressionActions = {
    async fetchExpressions() {
      try {
        setIsLoading(true);
        const items = await BaseAPI.getTrainingListAll(filters);
        setExpressions(items);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    async applyModeOff() {
      applyMode.applyOnOF();
      await this.fetchExpressions();
    },
    async updateFieldForList(data) {
      setFieldArr(data.list, data.field, data.fieldValue);
      await this.applyModeOff();
      // applyMode.applyOnOF();
      // await this.fetchExpressions();
    },

    async updateLabelsForList(data) {
      setFieldArr(
        data.list,
        "labelid",
        data.hasOwnProperty("label") ? data.label.id : data.labelid
      );
      await this.applyModeOff();
    },

    async changeExpressionLabels(value) {
      const valName = value ? value.name : "REMOVING";
      applyMode.applyOnOF({
        label: value,
        btnName: "APPLY",
        btnFn: this.updateLabelsForList,
        title: `SELECT PHRASES FOR LABEL ${valName} AND PRESS APPLY`,
      });
    },

    async changeStatusField(data) {
      try {
        const updated = expressions
          .filter((el) => data.list.includes(el.id))
          .map((el) => el.setStatus(data.fieldValue));

        await BaseAPI.editExpressionBatch(updated);

        await this.applyModeOff();
      } catch (error) {
        setPopup.error("Failed to change status: " + error.message);
      }
    },

    createFile(data) {
      const selectedItems = expressions.filter((el) =>
        data.list.includes(el.id)
      );
      const selectedList = createFilesData(selectedItems);
      const fileURL = window.URL.createObjectURL(selectedList);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = "expressions.txt";
      link.click();
      link.remove();
      applyMode.applyOnOF();
    },

    async downloadMode() {
      applyMode.applyOnOF({
        title: `SELECT PHRASES TO DOWNLOAD AND PRESS THE BUTTON`,
        btnName: "GET",
        btnFn: this.createFile,
      });
    },

    async deleteMode() {
      const deleteSome = async (data) => {
        const ids = data.list;
        let res = await deleteSomeExpressions(ids);
        if (res?.error) {
          setPopup.error("Something goes wrong.." + res.error);
          return;
        }
        const newList = expressions.filter((el) => !ids.includes(el.id));
        setExpressions(newList);
        applyMode.applyOnOF();
      };
      applyMode.applyOnOF({
        title: `SELECT PHRASES TO DELETE AND PRESS DELETE`,
        btnName: "DELETE",
        btnFn: deleteSome,
      });
    },

    async deleteSome(data) {
      const ids = data.list;
      let res = await deleteSomeExpressions(ids);
      if (res?.error) {
        setPopup.error("Something goes wrong.." + res.error);
        return;
      }
      const newList = expressions.filter((el) => !ids.includes(el.id));
      setExpressions(newList);
      applyMode.applyOnOF();
    },

    async expressionsDelete(expression = "") {
      let res = await deleteExpressions(expression);
      if (res?.error) {
        setPopup.error("Something goes wrong.." + res.error);
        return;
      }
      const newList = expressions.filter((el) => el.id !== expression.id);
      setExpressions(newList);
      applyMode.applyOnOF();
    },
    //edit from list
    async contentQuickEdit(updatedData) {
      try {
        await BaseAPI.editExpression(updatedData);
      } catch (error) {
        setPopup.error(error.message);
      }
      await this.fetchExpressions();
    },
    //edit from edit windows
    async contentEdit(updatedData) {
      if (!updatedData) {
        editMode.setEdit(null);
        return;
      }
      if (updatedData === "newCancel") {
        editMode.setEdit(null);
        const newList = expressions.filter((el) => el.id !== "new");
        setExpressions(newList);
        return;
      }

      if (updatedData.id === "new") {
        try {
          await BaseAPI.createExpression(
            updatedData.expression,
            updatedData.phrase,
            updatedData.labelid,
            updatedData.note,
            updatedData.inQueue
          );
          await this.fetchExpressions();
          editMode.setEdit(null);
          setPopup.success("expression was added");
        } catch (error) {
          setPopup.error(error.message);
        }
        return;
      }
      //editing in edit window
      if (editMode.editElem) {
        try {
          const expr = new Expression(editMode.editElem);
          const changedFields = expr.getUpdatedFields(updatedData);
          if (Object.keys(changedFields).length === 1) {
            editMode.setEdit(null);
            return;
          }
          await BaseAPI.editExpression(changedFields);
        } catch (error) {
          setPopup.error(error.message);
        }
        editMode.setEdit(null);

        await this.fetchExpressions();
      }
    },

    async addNew() {
      const newEl = {
        id: "new",
        expression: "",
        phrase: "",
        note: "",
      };
      const newList = [newEl, ...expressions];
      setExpressions(newList);
      editMode.setEdit(newEl);
    },

    setExpressions,
  };

  return {
    expressions,
    isLoading,
    expressionActions,
  };
};
