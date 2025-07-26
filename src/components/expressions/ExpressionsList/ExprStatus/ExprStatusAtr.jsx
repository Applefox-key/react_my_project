import React from "react";
import cl from "./ExprStatus.module.scss";
import { inQueueIcons, statusIcons } from "../../../../constants/statusConst";
import SwitchBtn from "../../../UI/SwitchBtn/SwitchBtn";
import DropDownList from "../../../UI/DropDownList/DropDownList";

const ExprStatusAtr = ({
  stat = "new",
  inQueue,
  short,
  onStatusChange,
  onTogglePool,
  className,
}) => {
  const current = statusIcons[stat];
  const allowedNext = current?.possible || [];
  return (
    <div
      className={[
        short ? cl["status-wrap-short"] : cl["status-wrap"],
        className || "",
      ].join(" ")}>
      {/* inQueue toggle */}
      <div className={cl["pool-box"]}>
        {short && (
          <div title={inQueue ? "Remove from the queue" : "Add to the queue"}>
            {inQueueIcons[+inQueue]}
          </div>
        )}
        {!short && (
          <>
            <p>{"Adding to the queue"}</p>
            <div
              className={cl["pool-ico"]}
              // onClick={() => onTogglePool && onTogglePool(!inQueue)}
              title={inQueue ? "Remove from the queue  " : "Add to the queue"}>
              {inQueue ? "In the queue" : "Not in the queue"}
              <SwitchBtn
                value={inQueue}
                setValue={onTogglePool}
                disabled={!!current?.poolDisable}
              />
            </div>
          </>
        )}
      </div>
      {/* Status block */}
      <div className={cl["status-box"]}>
        {short && <div title={current?.title}>{current?.icon}</div>}

        {!short && (
          <>
            <p>Status </p>
            <DropDownList
              val={stat}
              onValueChange={onStatusChange}
              list={allowedNext}
            />
            {/* <ExprStatus stat={stat} onStatusChange={onStatusChange} /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default ExprStatusAtr;
