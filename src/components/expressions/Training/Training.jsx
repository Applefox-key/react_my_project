import React, { useState, useEffect } from "react";
import BaseAPI from "../../../API/BaseAPI";
import { usePopup } from "../../../hooks/usePopup";
import { useQuery } from "../../../hooks/useQuery";
import TrainingCards from "./TrainingCards";
import SelectLabel from "../../Labels/SelectLabel";
import { useNavigate, useParams } from "react-router-dom";
import MySpinner from "../../UI/MySpinner/MySpinner";

const Training = () => {
  const [list, setList] = useState();

  const [label, setLabel] = useState("");
  const setPopup = usePopup();
  const params = useParams();

  const [getList, isLoading, error] = useQuery(async ([labelid] = "") => {
    const data = await BaseAPI.getUnreadExpressions(labelid);
    setList(data);
  });
  const selectLabel = (val = "") => {
    setLabel(val);
    getList(val ? val.id : "");
  };

  const defineLabel = () => {
    if (label) return label;
    const labelid = params.labelid;
    const labelName = params.labelName;
    if (labelid) return { id: labelid, name: labelName };
    return "";
  };
  useEffect(() => {
    const labelid = params.labelid;
    const labelName = params.labelName;
    if (labelid) setLabel({ id: labelid, name: labelName });
    getList(labelid ? labelid : "");
    if (error) setPopup.error(error);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //actions
  const expressionUpdate = async (expression) => {
    await BaseAPI.updateExpression(expression);
    const newList = list.filter((item) => expression.id !== item.id);
    if (newList.length === 0) setPopup.success("GOOD JOB!");
    setList(newList);
  };
  const route = useNavigate();
  return (
    <div className="training-field">
      <div className="training-menu">
        <div className="training-label">
          <SelectLabel
            onSelect={selectLabel}
            colCat={defineLabel()}
            isOne={true}
          />
        </div>

        <div className="colorhint">
          you have {list ? list.length : 0} expressions to read{" "}
          {label ? " (label " + label.name + ")" : ""}
        </div>

        <button onClick={() => route("/expressions")} className="btn-back">
          BACK
        </button>
      </div>

      <div>
        {isLoading || !list ? (
          <MySpinner />
        ) : (
          <>
            <TrainingCards items={list} expressionUpdate={expressionUpdate} />
          </>
        )}
      </div>
    </div>
  );
};

export default Training;
