import React from "react";
import cl from "./PlanAndHistory.module.scss";

const History = ({ expression }) => {
  let history = expression.userHistory;

  const stylecss = (item) => {
    if (item.includes("skipped")) return { color: "red", fontWeight: "600" };
    if (item.includes("new try")) return { color: "green", fontWeight: "800" };
    if (item.includes("add")) return { color: "green", fontWeight: "800" };
    return {};
  };
  return (
    <ul className={cl.history}>
      {history.map((item, i) => (
        <li key={i} className={cl.historyRow} style={stylecss(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default History;
