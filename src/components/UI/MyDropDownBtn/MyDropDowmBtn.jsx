import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const MyDropDownBtn = ({ arr, title, variant }) => {
  return (
    <DropdownButton size="lg" variant={variant} title={title}>
      {arr.map((item, i) =>
        item.href || item.onClick ? (
          <Dropdown.Item
            key={i}
            href={item.href ? item.href : ""}
            onClick={item.onClick}>
            {item.name}
          </Dropdown.Item>
        ) : (
          <Dropdown.Divider key={i} />
        )
      )}
    </DropdownButton>
  );
};

export default MyDropDownBtn;