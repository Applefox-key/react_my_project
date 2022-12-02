import React from "react";
import Badge from "react-bootstrap/esm/Badge";

const TrainingHeader = ({ list }) => {
  return (
    <div className="p-1">
      <h3>
        <Badge bg="warning" text="dark">
          you have {list ? list.length : 0} expressions to read
        </Badge>
      </h3>{" "}
    </div>
  );
};

export default TrainingHeader;
