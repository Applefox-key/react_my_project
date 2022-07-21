import React from "react";
import Badge from "react-bootstrap/esm/Badge";
import RadioCheck from "../UI/radio/RadioCheck";
import UserAvatar from "../users/UserAvatar";

const TrainingHeader = ({ list, check }) => {
  return (
    <div className="p-1">
      {/* <UserAvatar
        style={{
          width: "5%",
          float: "right",
          marginRight: "2%",
          marginLeft: "-2%",
        }}
      /> */}
      <h3>
        <Badge bg="warning" text="dark">
          you have {list ? list.length : 0} expressions to read
        </Badge>
      </h3>{" "}
      <div>
        <RadioCheck
          list={["one by one", "list"]}
          val="one by one"
          callback={check}
        />
      </div>
    </div>
  );
};

export default TrainingHeader;
