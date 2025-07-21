import { useState } from "react";
import BaseAPI from "../API/BaseAPI";
import { createFilesData } from "../utils/files";
import {
  deleteExpressions,
  deleteSomeExpressions,
  setLabelToArr,
} from "../utils/expressions";
import { usePopup } from "./usePopup";

export const useExpressionsByFolders = (applyMode, editMode, filters) => {
  // const limit = 20;
  const [expressions, setExpressions] = useState([]);
  // const [pageParams, setPageParams] = useState({ page: 1, pageTotal: 1 });
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const setPopup = usePopup();

  //actions with expressions
  // const expressionsActions = {
  //   async getExpression() {
  //     try {
  //       setIsLoading(true);
  //       // if (pageParams.page === 0) {
  //       const expressions = await BaseAPI.getTrainingListByFolders(filters);
  //       setExpressions(expressions);
  //       // const totalSrv = Math.ceil(expressions.length / limit);
  //       // if (totalSrv !== pageParams.pageTotal)
  //       // setPageParams({ ...pageParams, pageTotal: totalSrv });
  //       // } else {
  //       //   const [expressions, totalSrv] = await BaseAPI.getTrainingListOnePage(
  //       //     limit,
  //       //     pageParams.page,
  //       //     filters
  //       //   );
  //       // setExpressions(expressions);

  //       // if (totalSrv !== pageParams.pageTotal)
  //       // setPageParams({ ...pageParams, pageTotal: totalSrv });
  //       // }
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   //group change expressions labels
  //   async changeExpressionLabels(value) {
  //     const valName = value ? value.name : "REMOVING";
  //     //set label to the expression
  //     const labelToArr = async (data) => {
  //       setLabelToArr(data.list, data.label.id);
  //       applyMode.applyOnOF();
  //       // if (pageParams.page !== 0) {
  //       //   setPageParams({ ...pageParams, page: 0 });
  //       // } else {
  //       await this.getExpression();
  //       // }
  //     };
  //     applyMode.applyOnOF({
  //       label: value,
  //       btnName: "APPLY",
  //       btnFn: labelToArr,
  //       title: ` SELECT PHRASES FOR LABEL ${valName} AND PRESS  APPLY`,
  //     });
  //   },

  //   async downloadMode() {
  //     //download expressions
  //     const createFile = (data) => {
  //       const selectedList = createFilesData(
  //         expressions.filter((el) => data.list.includes(el.id))
  //       );
  //       const fileURL = window.URL.createObjectURL(selectedList);
  //       const link = document.createElement("a");
  //       link.href = fileURL;
  //       link.download = "expressions.txt";
  //       link.click();
  //       link.remove();
  //       applyMode.applyOnOF();
  //     };
  //     applyMode.applyOnOF({
  //       title: `SELECT PHRASES TO DOWNLOAD AND PRESS THE BUTTON`,
  //       btnName: "GET",
  //       btnFn: createFile,
  //     });
  //   },
  //   //apply mode for deleting
  //   async deleteMode() {
  //     const deleteSome = async (data) => {
  //       const ids = data.list;
  //       let res = await deleteSomeExpressions(ids);
  //       if (res.error) {
  //         setPopup.error("Something goes wrong.." + res.error);
  //         return;
  //       }
  //       if (!res) return;
  //       let arr = expressions.filter((elem) => !ids.includes(elem.id));
  //       setExpressions(arr);
  //       applyMode.applyOnOF();
  //     };
  //     applyMode.applyOnOF({
  //       title: `SELECT PHRASES TO DELETE AND PRESS DELETE`,
  //       btnName: "DELETE",
  //       btnFn: deleteSome,
  //     });
  //   },
  //   //delete some expression
  //   async deleteSome(data) {
  //     const ids = data.list;
  //     let res = await deleteSomeExpressions(ids);
  //     if (res.error) {
  //       setPopup.error("Something goes wrong.." + res.error);
  //       return;
  //     }
  //     if (!res) return;
  //     let arr = expressions.filter((elem) => !ids.includes(elem.id));
  //     setExpressions(arr);
  //   },
  //   //delete expression
  //   async expressionsDelete(expression = "") {
  //     let res = await deleteExpressions(expression);
  //     if (res.error) {
  //       setPopup.error("Somethig goes wrong.." + res.error);
  //       return;
  //     }
  //     if (!res) return;
  //     let arr = expression
  //       ? expressions.filter((elem) => elem.id !== expression.id)
  //       : [];
  //     setExpressions(arr);
  //   },
  //   //define expression number
  //   ordNumber(i) {
  //     return (
  //       i + (pageParams.page ? pageParams.page - 1 : pageParams.page) * limit
  //     );
  //   },
  //   ///edit phrase or cancel edit mode
  //   async contentEdit(newV) {
  //     //value hasn't been changed
  //     if (!newV) {
  //       editMode.setEdit(null);
  //       return;
  //     }
  //     //adding new item has been canceled
  //     if (newV === "newCancel") {
  //       editMode.setEdit(null);
  //       setExpressions(expressions.filter((el) => el.id !== "new"));
  //       return;
  //     }
  //     //add new item
  //     if (newV.id === "new") {
  //       try {
  //         await BaseAPI.createExpression(
  //           newV.expression,
  //           newV.phrase,
  //           newV.labelid,
  //           newV.note
  //         );
  //         await this.getExpression();
  //         editMode.setEdit(null);
  //         setPopup.success("expression was added");
  //       } catch (error) {
  //         setPopup.error(error.message);
  //       }
  //       return;
  //     }
  //     //edit item
  //     try {
  //       await BaseAPI.editExpression(newV);
  //     } catch (error) {
  //       setPopup.error(error.message);
  //     }
  //     editMode.setEdit(null);
  //     await this.getExpression();
  //   },
  //   //add new phrase
  //   async addNew() {
  //     const newEl = {
  //       id: "new",
  //       expression: "",
  //       phrase: "",
  //       note: "",
  //     };
  //     setExpressions([newEl, ...expressions]);
  //     editMode.setEdit(newEl);
  //   },
  //   setExpressions,
  // };
  const expressionsActions = {
    async getExpression() {
      try {
        setIsLoading(true);
        const grouped = await BaseAPI.getTrainingListByFolders(filters);

        setExpressions(grouped);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    async changelabelsF(data) {
      setLabelToArr(data.list, data.labelid ? data.labelid : "REMOVING");
      applyMode.applyOnOF();
      await this.getExpression();
    },

    async labelToArr(data) {
      setLabelToArr(
        data.list,
        data.hasOwnProperty("label") ? data.label.id : data.labelid
      );
      applyMode.applyOnOF();
      await this.getExpression();
    },
    async changeExpressionLabels(value) {
      debugger;
      const valName = value ? value.name : "REMOVING";
      //  const labelToArr = async (data) => {
      // //   setLabelToArr(
      // //     data.list,
      // //     data.hasOwnProperty("label") ? data.label.id : data.labelid
      // //   );
      //   applyMode.applyOnOF();
      //   await this.getExpression();
      // };
      applyMode.applyOnOF({
        label: value,
        btnName: "APPLY",
        btnFn: this.labelToArr,
        title: `SELECT PHRASES FOR LABEL ${valName} AND PRESS APPLY`,
      });
    },
    createFile(data) {
      const selectedItems = expressions
        .flatMap((group) => group.items)
        .filter((el) => data.list.includes(el.id));
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
        // удалить элементы из всех групп
        const newGrouped = expressions
          .map((group) => ({
            ...group,
            items: group.items.filter((el) => !ids.includes(el.id)),
          }))
          .filter((group) => group.items.length > 0);
        setExpressions(newGrouped);
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
      const newGrouped = expressions
        .map((group) => ({
          ...group,
          items: group.items.filter((el) => !ids.includes(el.id)),
        }))
        .filter((group) => group.items.length > 0);
      setExpressions(newGrouped);
    },

    async expressionsDelete(expression = "") {
      let res = await deleteExpressions(expression);
      if (res?.error) {
        setPopup.error("Something goes wrong.." + res.error);
        return;
      }
      const newGrouped = expressions
        .map((group) => ({
          ...group,
          items: group.items.filter((el) => el.id !== expression.id),
        }))
        .filter((group) => group.items.length > 0);
      setExpressions(newGrouped);
    },

    // ordNumber(i) {
    //   return (
    //     i + (pageParams.page ? pageParams.page - 1 : pageParams.page) * limit
    //   );
    // },

    async contentEdit(newV) {
      if (!newV) {
        editMode.setEdit(null);
        return;
      }
      if (newV === "newCancel") {
        editMode.setEdit(null);
        const newGrouped = expressions.map((group) => ({
          ...group,
          items: group.items.filter((el) => el.id !== "new"),
        }));
        setExpressions(newGrouped);
        return;
      }

      if (newV.id === "new") {
        try {
          await BaseAPI.createExpression(
            newV.expression,
            newV.phrase,
            newV.labelid,
            newV.note
          );
          await this.getExpression();
          editMode.setEdit(null);
          setPopup.success("expression was added");
        } catch (error) {
          setPopup.error(error.message);
        }
        return;
      }

      try {
        await BaseAPI.editExpression(newV);
      } catch (error) {
        setPopup.error(error.message);
      }
      editMode.setEdit(null);
      await this.getExpression();
    },

    async addNew() {
      const newEl = {
        id: "new",
        expression: "",
        phrase: "",
        note: "",
      };
      const groupIndex = expressions.findIndex(
        (group) => group.labelid === null || group.labelid === undefined
      );
      const newGrouped = [...expressions];
      if (groupIndex !== -1) {
        newGrouped[groupIndex].items.unshift(newEl);
      } else {
        newGrouped.unshift({
          labelid: null,
          labelname: "No Label",
          items: [newEl],
        });
      }
      setExpressions(newGrouped);
      editMode.setEdit(newEl);
    },

    setExpressions,
  };
  return {
    expressions,
    isLoading,
    expressionsActions,
  };
};
