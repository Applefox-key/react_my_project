import BaseAPI from "../API/BaseAPI";
import { imgSrv } from "../constants/serverConst";

const generateLink = (imgName) => {
  if (!imgName) return "";
  if (imgName.includes("blob:")) {
    return imgName;
  }
  if (imgName.startsWith("https://") || imgName.startsWith("/")) {
    return imgName;
  }
  return `${imgSrv}/avatars/?img=${imgName}&token=${BaseAPI.getToken()}`;
  //   return imgName.includes("blob:")
  //     ? imgName
  //     : imgSrv + "?avatars" + "&img=" + imgName + "&token=" + BaseAPI.getToken();
};
export const getAvatar = (img) => {
  if (!img) return "";
  return generateLink(img);
};
