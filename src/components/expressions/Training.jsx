import React, { useState, useEffect } from "react";
import BaseAPI from "../../API/BaseAPI";
import { usePopup } from "../../hooks/usePopup";
import { useQuery } from "../../hooks/useQuery";
import MySpinner from "../UI/MySpinner";
import TrainingCards from "./TrainingCards";
import TrainingHeader from "./TrainingHeader";

const Training = () => {
  const [list, setList] = useState();
  const setPopup = usePopup();

  const [getList, isLoading, error] = useQuery(async () => {
    const data = await BaseAPI.getUnreadExpressions();
    setList(data);
  });

  useEffect(() => {
    getList();
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

  return (
    <div className="mt-3 fs-3 ">
      <TrainingHeader list={list} />
      <div>
        {isLoading || !list ? (
          <MySpinner />
        ) : (
          <TrainingCards items={list} expressionUpdate={expressionUpdate} />
        )}
      </div>
    </div>
  );
};

export default Training;
