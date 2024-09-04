import { useState } from "react";

export const useApplyMode = () => {
  const [applyMode, setApplyMode] = useState({
    isOn: false,
    list: [],
    label: "",
    title: "",
    btnName: "",
    btnFn: "",
  });
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
  const selectAllApply = (expressions) => {
    const value = !applyMode.checkAll;
    setApplyMode({
      ...applyMode,
      checkAll: value,
      list: value ? expressions.map((el) => el.id) : [],
    });
  };

  const addToApply = (val) => {
    let listAp = applyMode.list.includes(val.id)
      ? [...applyMode.list].filter((el) => el !== val.id)
      : [...applyMode.list, val.id];

    setApplyMode({
      ...applyMode,
      list: listAp,
    });
  };

  return { ...applyMode, applyOnOF, selectAllApply, addToApply };
};
