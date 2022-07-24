import { useNavigate, useParams } from "react-router-dom";
import BaseExtraAPI from "../API/BaseExtraAPI";
import { useQuery } from "./useQuery";

export const useGame = (setCallback = null, changeContent = null) => {
  const pageParam = useParams();

  const router = useNavigate();
  const [getContent, isLoading, error] = useQuery(async () => {
    const content =
      pageParam.tab === "pub"
        ? await BaseExtraAPI.getPublicContent(pageParam.id)
        : await BaseExtraAPI.getContent(pageParam.id);
    const newContent = changeContent ? changeContent(content) : content;
    if (setCallback) setCallback(newContent);
  });

  const back = () => {
    router(`/collections/${pageParam.tab}/${pageParam.id}/${pageParam.name}`);
  };
  return [getContent, back, isLoading, error];
};
