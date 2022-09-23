import React, { useEffect } from "react";
import MyCardExtra from "../UI/card/MyCardExtra";
import { useState } from "react";
import BaseExtraAPI from "../../API/BaseExtraAPI";
import { useQuery } from "../../hooks/useQuery";
import { useParams } from "react-router-dom";
import BackBtn from "../UI/BackBtn/BackBtn";

const ContentCardInfo = () => {
  const [item, setitem] = useState();
  const pageParam = useParams();
  const [getContent, ,] = useQuery(async () => {
    const content = await BaseExtraAPI.getContentItem(pageParam.item);

    setitem(content);
  });

  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam]);

  return (
    <>
      <div className="text-center mx-5 my-5">
        <BackBtn
          size="lg"
          variant="primary"
          path={`/collections/my/${pageParam.id}/${pageParam.name}`}
        />
      </div>
      {item && <MyCardExtra item={item} />}
    </>
  );
};

export default ContentCardInfo;
