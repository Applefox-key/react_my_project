import { useState, useCallback, useMemo } from "react";

export const useApplyMode = () => {
  const defaultState = useMemo(() => {
    return {
      isOn: false,
      list: [],
      label: "",
      title: "",
      btnName: "",
      btnFn: "",
      checkAll: false,
      selectedGroups: [],
    };
  }, []);
  const [applyModeState, setApplyModeState] = useState(defaultState);

  const applyOnOF = useCallback((obj = {}) => {
    setApplyModeState((prev) => ({
      ...prev,
      ...defaultState,
      isOn: !!obj.btnName,
      ...obj,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectAllApply = useCallback((expressions) => {
    setApplyModeState((prev) => {
      const value = !prev.checkAll;
      const newList = value
        ? expressions[0].hasOwnProperty("items")
          ? expressions.flatMap((la) => la.items.map((el) => el.id))
          : expressions.map((el) => el.id)
        : [];
      const selectedGroups = value
        ? expressions[0].hasOwnProperty("items")
          ? expressions.map((group) => group.labelid)
          : []
        : [];
      return {
        ...prev,
        checkAll: value,
        list: newList,
        selectedGroups,
      };
    });
  }, []);

  const toggleGroup = useCallback((group) => {
    setApplyModeState((prev) => {
      const isSelected = prev.selectedGroups.includes(group.labelid);
      const updatedGroups = isSelected
        ? prev.selectedGroups.filter((id) => id !== group.labelid)
        : [...prev.selectedGroups, group.labelid];

      const updatedList = isSelected
        ? prev.list.filter((id) => !group.items.some((el) => el.id === id))
        : [...prev.list, ...group.items.map((el) => el.id)];

      return {
        ...prev,
        selectedGroups: updatedGroups,
        list: updatedList,
      };
    });
  }, []);
  const addToApply = useCallback((val) => {
    setApplyModeState((prev) => {
      const alreadySelected = prev.list.includes(val.id);
      const newList = alreadySelected
        ? prev.list.filter((el) => el !== val.id)
        : [...prev.list, val.id];
      return {
        ...prev,
        list: newList,
      };
    });
  }, []);
  const isSelected = useCallback(
    (id) => applyModeState.list.includes(id),
    [applyModeState]
  );
  const isSelectedGr = useCallback(
    (id) => applyModeState.selectedGroups.includes(id),
    [applyModeState]
  );
  return useMemo(
    () => ({
      ...applyModeState,
      applyOnOF,
      selectAllApply,
      addToApply,
      toggleGroup,
      isSelected,
      isSelectedGr,
    }),
    [
      applyModeState,
      applyOnOF,
      selectAllApply,
      addToApply,
      toggleGroup,
      isSelected,
      isSelectedGr,
    ]
  );
};
