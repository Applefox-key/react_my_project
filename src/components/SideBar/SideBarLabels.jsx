import React, { useEffect, useState } from "react";
import cl from "./SideBar.module.scss";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import LabelNew from "../Labels/LabelNew";
import MySpinner from "../UI/MySpinner/MySpinner";

const SideBarLabels = ({ onSelect, selectedid }) => {
  const [labels, setLabels] = useState([]);
  const [isMenu, setIsMenu] = useState(false);
  const [getLabels, isLoadingCat] = useQuery(async () => {
    const cat = await BaseAPI.getLabelsList();
    setLabels(cat);
  });
  const router = useNavigate();
  const classGenerator = (item) => {
    const active_id = !selectedid ? "" : selectedid;
    const item_id = item.id;

    return [
      cl["link-box"],
      active_id === item_id ? cl["link-box-active"] : "",
    ].join(" ");
  };
  useEffect(() => {
    getLabels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteOne = async (element) => {
    if (!window.confirm("Delete this label?")) return;
    await BaseAPI.deleteLabel(element.id);
    let arr = labels.filter((elem) => elem.id !== element.id);
    setLabels(arr);
  };

  return (
    <div
      className={cl["sideBar-wide"]}
      tabIndex={-1}
      onBlur={(e) => {
        if (!e.relatedTarget) setIsMenu("");
      }}>
      <div className="d-flex justify-content-center align-items-center">
        <h3>LABELS</h3>
        <LabelNew
          callback={() => {
            getLabels();
          }}
        />
      </div>
      {isLoadingCat ? (
        <MySpinner />
      ) : (
        labels.map((el) => (
          <div
            className={classGenerator(el)}
            key={el.id}
            onClick={() => onSelect(el)}>
            <div>
              <span>✦</span>
              {el.name}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenu(isMenu ? "" : el.id);
              }}>
              <CiMenuKebab />
            </button>
            {isMenu === el.id && (
              <div className={cl.miniMenu} id="miniMenu">
                {
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(el, true);
                      setIsMenu(false);
                    }}>
                    apply label
                  </button>
                }
                <button
                  title="delete label"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteOne(el);
                  }}>
                  delete label ❌
                </button>
                <button
                  title=" to training"
                  onClick={(e) => {
                    e.stopPropagation();
                    router(`/training/${el.id}/${el.name}`);
                  }}>
                  to training
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
export default SideBarLabels;
