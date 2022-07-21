import { useNavigate, useParams } from "react-router-dom";
import BaseExtraAPI from "../API/BaseExtraAPI";
import { useQuery } from "./useQuery";

export const useGame = (setCallback, changeContant = "") => {
  const pageParam = useParams();
  const router = useNavigate();
  const [getContent, isLoading, error] = useQuery(async () => {
    const content = await BaseExtraAPI.getContent(pageParam.id);
    const newContant = changeContant ? changeContant(content) : content;
    setCallback(newContant);
  });

  const back = () => {
    router(`/collections/${pageParam.id}/${pageParam.name}`);
  };
  return [getContent, back, isLoading, error];
};
