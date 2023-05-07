import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";
import LabelFilter from "./LabelFilter";
import LabelItems from "./LabelItems";
import LabelLink from "./LabelLink";
import cl from "./Labels.module.scss";

const SelectLabelBody = ({ selected, isOne, onSelect, closeFn }) => {
  const [labels, setLabels] = useState([]);
  const [filter, setFilter] = useState("");
  const [getLabels, isLoadingCat] = useQuery(async () => {
    const cat = await BaseAPI.getLabelsList();
    setLabels(cat);
  });
  const addUserLabel = async () => {
    await BaseAPI.createLabel(filter);
    onSelectItem(filter, 0);
    getLabels();
  };
  const onSelectItem = (value = "", close = 1) => {
    setFilter("");
    onSelect(value);
    if (close) closeFn();
  };

  useEffect(() => {
    getLabels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-100">
      <Dropdown.Menu className={cl.max_content}>
        <div id="labelSelectorBody">
          <LabelFilter filter={filter} setFilter={setFilter} />
          {!isLoadingCat && labels && (
            <div>
              {!filter && selected && (
                <LabelLink onSelectItem={onSelectItem} isOne={isOne} />
              )}
              <LabelItems
                add={addUserLabel}
                selected={selected}
                onSelect={onSelectItem}
                list={labels.filter(
                  (el) => !filter || el.name.toLowerCase().startsWith(filter)
                )}
              />
            </div>
          )}
        </div>{" "}
      </Dropdown.Menu>
    </div>
  );
};

export default SelectLabelBody;
