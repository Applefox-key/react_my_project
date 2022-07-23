import React, { useEffect } from "react";
import MyCardExtra from "../UI/card/MyCardExtra";
import { useState } from "react";
import BaseExtraAPI from "../../API/BaseExtraAPI";
import { useQuery } from "../../hooks/useQuery";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const ContentCardInfo = () => {
  const [item, setitem] = useState();
  const router = useNavigate();

  const pageParam = useParams();
  const [getContent, ,] = useQuery(async () => {
    const content = await BaseExtraAPI.getContentItem(pageParam.item);

    setitem(content);
  });

  useEffect(() => {
    getContent();
  }, [pageParam]);

  const back = () => {
    router(`/collections/${pageParam.id}/${pageParam.name}`);
  };

  return (
    <>
      <div className="text-start mx-5 my-5">
        <Button variant="primary" onClick={back}>
          {"❰ Back"}
        </Button>
      </div>
      {item && <MyCardExtra item={item} />}
    </>
  );
};

export default ContentCardInfo;
