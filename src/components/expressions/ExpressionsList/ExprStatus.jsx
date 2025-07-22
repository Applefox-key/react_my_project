import React, { useState } from "react";
import { Form, Dropdown, Button } from "react-bootstrap";
import {
  inPoolIcons,
  statusIcons,
  statusArr,
} from "../../../constants/statusConst";

const ExprStatus = ({ stat, inPool, short, onStatusChange, onTogglePool }) => {
  const [pl, setPl] = useState(false);
  const current = statusIcons[stat];
  const allowedNext = current?.possible || [];

  return (
    <div className="status-wrap">
      {/* inPool toggle */}
      <div className="pool-box">
        {short && (
          <div title={inPool ? "Remove from pool" : "Add to pool"}>
            {inPoolIcons[+inPool]}
          </div>
        )}
        {!short && (
          <>
            <p>{"Adding to the future pool"}</p>
            <div
              className="pool-ico"
              onClick={() => onTogglePool && onTogglePool(!inPool)}
              title={inPool ? "Remove from pool  " : "Add to pool"}>
              {pl ? "Is in the pool" : "Not in the pool"}
              <label className={"btnSwitch"}>
                <input
                  type="checkbox"
                  checked={pl}
                  onChange={(e) => {
                    e.stopPropagation();
                    setPl(!pl);
                    // handleChange(e);
                  }}
                />
                <span className="slider"></span>
              </label>
            </div>
          </>
        )}
      </div>
      {/* Status block */}
      <div className="status-box">
        {short && <div title={current?.title}>{current?.icon}</div>}

        {!short && (
          <>
            <p>Status {current?.icon}</p>
            <Dropdown
              onSelect={(newStatus) =>
                onStatusChange && onStatusChange(newStatus)
              }>
              <Dropdown.Toggle variant="light" id="dropdown-status">
                {stat}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {allowedNext.map((s) => (
                  <Dropdown.Item key={s} eventKey={s}>
                    {s}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}
      </div>
    </div>
  );
};

export default ExprStatus;
