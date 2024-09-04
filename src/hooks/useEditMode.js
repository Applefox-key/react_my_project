import { useState } from "react";

export const useEditMode = () => {
  const [editElem, setEditElem] = useState(null);
  //edit mode ON-OFF
  const setEdit = (content) => {
    if (!content) setEditElem(null);
    else
      setEditElem({
        id: content.id,
        phrase: content.phrase,
        expression: content.expression,
        labelid: content.labelid,
        label: content.label,
        note: content.note,
      });
  };
  return { editElem, setEdit };
};
