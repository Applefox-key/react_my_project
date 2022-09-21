import React, { useState, useEffect, useContext } from "react";
import BaseAPI from "../API/BaseAPI";
import TrainingList from "../components/expressions/TrainingList";
import { useQuery } from "../hooks/useQuery";
import MySpinner from "../components/UI/MySpinner";
import { PopupContext } from "../context";
import TrainingCards from "../components/expressions/TrainingCards";
import TrainingHeader from "../components/expressions/TrainingHeader";

const Training = () => {
  // const [collectionid, setCollectionid] = useState(-1);
  const [list, setList] = useState();
  const [mode, setMode] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const { popupSetting, setPopupSettings } = useContext(PopupContext);
  //other hooks
  const [getList, isLoading, error] = useQuery(async () => {
    const data = await BaseAPI.getUnreadExpressions();
    setList(data);
  });
  const check = (event) => {
    setMode(event.target.id);
  };
  useEffect(() => {
    getList();
    if (error) setPopupSettings([true, error, "error"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //actions
  const expressionUpdate = async (expression) => {
    await BaseAPI.updateExpression(expression.id);
    const newList = list.filter((item) => expression.id !== item.id);
    if (newList.length === 0) setPopupSettings([true, "GOOD JOB!", "success"]);
    setList(newList);
  };

  return (
    <div className="mt-3 fs-3 ">
      <TrainingHeader list={list} check={check} />
      <div>
        {isLoading || !list ? (
          <MySpinner />
        ) : mode ? (
          <TrainingList list={list} expressionUpdate={expressionUpdate} />
        ) : (
          <TrainingCards items={list} expressionUpdate={expressionUpdate} />
        )}
      </div>
    </div>
  );
};

export default Training;
