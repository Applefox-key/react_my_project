import { MdOutlineFiberNew } from "react-icons/md";
import { ImPlay2, ImPause, ImCircleDown } from "react-icons/im";
import { CgRadioChecked } from "react-icons/cg";
import { CgRadioCheck } from "react-icons/cg";

export const statusArr = ["new", "active", "paused", "completed"];
export const statusIcons = {
  "new": {
    icon: <MdOutlineFiberNew />,
    poolDisable: false,
    possible: ["active"],
    title: "expresion is recently added",
  },
  "active": {
    icon: <ImPlay2 />,
    poolDisable: true,
    possible: ["paused"],
    title: "expresion is active",
  },
  "paused": {
    icon: <ImPause />,
    poolDisable: false,
    possible: ["active"],
    title: "expresion is paused",
  },
  "completed": {
    icon: <ImCircleDown />,
    poolDisable: false,
    possible: ["active"],
    title: "expresion is complite",
  },
};
export const inPoolIcons = [<CgRadioCheck />, <CgRadioChecked />];
// export const inPoolIcons = ["⚪", "🟢"];
