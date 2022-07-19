import React, { useState, useEffect, useContext } from "react";
import BaseAPI from "../API/BaseAPI";
import UserAvatar from "../components/users/UserAvatar";
import TrainingList from "../components/expressions/TrainingList";
import MySelect from "../components/UI/MySelect";
import { useQuery } from "../hooks/useQuery";
import MySpinner from "../components/UI/MySpinner";
import { PopupContext } from "../context";

const Training = () => {
  // const [collectionid, setCollectionid] = useState(-1);
  const [list, setList] = useState();
  // const [collectionsList, setCollectionsList] = useState();
  const { popupSetting, setPopupSettings } = useContext(PopupContext);
  //other hooks
  const [getList, isLoadingExpressions, errorExpressions] = useQuery(
    async () => {
      console.log("effect DB UnreadExpressions");
      const data = await BaseAPI.getUnreadExpressions();
      setList(data);
    }
  );

  useEffect(() => {
    getList();
  }, []);

  //actions
  const expressionUpdate = async (expression) => {
    await BaseAPI.updateExpression(expression.id);
    const newList = list.filter((item) => expression.id !== item.id);
    if (newList.length == 0) setPopupSettings([true, "GOOD JOB!", "success"]);
    setList(newList);
  };

  return (
    <div>
      <div className="d-flex p-2 justify-content-center ">
        <UserAvatar />
        <h1 className="display-1 mb-2">Training</h1>
      </div>

      {isLoadingExpressions ? (
        <MySpinner />
      ) : (
        <TrainingList list={list} expressionUpdate={expressionUpdate} />
      )}
    </div>
  );
};

export default Training;
