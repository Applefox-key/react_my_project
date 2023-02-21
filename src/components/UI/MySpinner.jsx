import React from "react";
import Spinner from "react-bootstrap/Spinner";

const MySpinner = () => {
  return (
    <div style={{ marginTop: "10rem" }}>
      <Spinner animation="grow" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default MySpinner;
