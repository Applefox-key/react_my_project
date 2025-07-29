import React from "react";
import cl from "./ExprStatus.module.scss";
import { inQueueIcons, statusIcons } from "../../../../constants/statusConst";

const ExprStatusInf = ({ stat = "new", inQueue, textForm, className }) => {
  const current = statusIcons[stat];
  const titleQueue = inQueue
    ? "expresion is in the queue"
    : "expresion is out of the queue";

  return (
    <div
      className={[
        textForm ? cl["status-wrap-txt"] : cl["status-wrap-short"],
        className || "",
      ].join(" ")}>
      <span>{textForm ? current.title : current?.icon}</span>
      <span>{textForm ? titleQueue : inQueueIcons[+inQueue]}</span>
    </div>
  );
};

export default ExprStatusInf;
