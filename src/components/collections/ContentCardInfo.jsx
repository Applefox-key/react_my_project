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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam]);

  const back = () => {
    router(`/collections/my/${pageParam.id}/${pageParam.name}`);
  };

  return (
    <>
      <div className="text-center mx-5 my-5">
        <Button variant="primary" size="lg" onClick={back}>
          {"❰ Back"}
        </Button>
      </div>
      {item && <MyCardExtra item={item} />}
    </>
  );
};

export default ContentCardInfo;
