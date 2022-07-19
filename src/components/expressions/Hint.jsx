import React from "react";

const Hint = ({ hintForUser, overdue }) => {
  return (
    <div className={overdue ? "hint bg-danger text-white" : "hint bg-info"}>
      {hintForUser}
    </div>
  );
};

export default Hint;
