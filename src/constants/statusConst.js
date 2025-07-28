import { GiSandsOfTime } from "react-icons/gi";
export const statusArr = ["new", "active", "paused", "completed"];
export const statusIcons = {
  "new": {
    // icon: <MdOutlineFiberNew className="iconNew" />,
    icon: <span className="textStat">new</span>,
    poolDisable: false,
    possible: ["active"],
    title: "expresion is recently added",
  },
  "active": {
    // icon: <ImPlay2 className="iconStat" />,
    icon: <span className="textStat">active</span>,
    poolDisable: true,
    possible: ["paused"],
    title: "expresion is active",
  },
  "paused": {
    // icon: <ImPause className="iconStat" />,
    icon: <span className="textStat">paused</span>,
    poolDisable: false,
    possible: ["active"],
    title: "expresion is paused",
  },
  "completed": {
    // icon: <ImCircleDown className="iconStat" />,
    icon: <span className="textStat">🎉completed</span>,
    poolDisable: false,
    possible: ["active"],
    title: "study completed",
  },
};
export const inQueueIcons = ["", <GiSandsOfTime />];
// [<CgRadioCheck />, <CgRadioChecked />];
// export const inQueueIcons = ["⚪", "🟢"];
