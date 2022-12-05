import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyDropDownBtn = ({ arr, title, variant, dis, size = "lg" }) => {
  const router = useNavigate();
  return (
    <DropdownButton disabled={dis} size={size} variant={variant} title={title}>
      {arr.map((item, i) =>
        item.href || item.onClick ? (
          <Dropdown.Item
            key={i}
            style={{ fontSize: "1.5rem" }}
            href={item.href ? item.href : ""}
            onClick={item.onClick ? item.onClick : () => router(item.href)}>
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
