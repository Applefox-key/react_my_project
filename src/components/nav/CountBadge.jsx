import React, { useState, useEffect } from "react";
import cl from "./MyNavbar.module.scss";
import BaseAPI from "../../API/BaseAPI";
import { useQuery } from "../../hooks/useQuery";
import { usePopup } from "../../hooks/usePopup";

const CountBadge = () => {
  const [list, setList] = useState();
  const setPopup = usePopup();

  // eslint-disable-next-line no-unused-vars
  const [getList, isLoading, error] = useQuery(async () => {
    const data = await BaseAPI.getUnreadExpressions();
    setList(data.length);
  });

  useEffect(() => {
    getList();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{!!list && <div className={cl.countBadge}>{list}</div>}</>;
};

export default CountBadge;
