import React, { useEffect, useRef, useState } from "react";

import BaseAPI from "../../API/BaseAPI";
import { useQuery } from "../../hooks/useQuery";
import { Form } from "react-bootstrap";

const SelectLabelList = ({ onSelect = null, lgSize = false }) => {
  const [selected, setSelected] = useState(null);
  const [labels, setLabels] = useState([]);

  const [getLabels, isLoadingCat] = useQuery(async () => {
    const cat = await BaseAPI.getLabelsList();
    setLabels(cat);
  });

  // const onSelectItem = (value = "", close = 1) => {
  //   setFilter("");
  //   onSelect(value);
  //   if (close) closeFn();
  // };

  useEffect(() => {
    getLabels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const onSelectLabel = (value = "") => {
  //   if (selected.id === value.id) return;
  //   setSelected(value);
  //   onSelect(value);
  // };
  // const addUserLabel = async () => {
  //   await BaseAPI.createLabel(selected);
  //   onSelectLabel(selected, 0);
  //   getLabels();
  // };
  // const ref = useRef();
  // useOutsideClick(ref, () => setMode(false));
  console.log(labels);

  return (
    <div>
      <Form.Control
        as="input"
        list="group-options"
        className="tmp-add-text0"
        placeholder="group"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      />
      <datalist id="group-options">
        {labels.map((option, idx) => (
          <option value={option.name} key={idx}>
            {option.name}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default SelectLabelList;
