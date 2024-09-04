import { useState } from "react";

export const useFilters = () => {
  const [filters, setFilters] = useState({
    filter: "",
    labelid: "",
    label: "",
    stage: null,
  });
  const setFilter = (filterName, value) => {
    if (filterName === "label") {
      const newFilters = {
        ...filters,
        labelid: value ? value.id : "",
        label: value ? value.name : "",
      };
      setFilters(newFilters);
    } else {
      setFilters({ ...filters, [filterName]: value });
    }
  };
  return { filters: filters, setFilters: setFilter };
};
