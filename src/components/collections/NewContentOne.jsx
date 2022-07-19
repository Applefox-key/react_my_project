import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import MyInputGroup from "../UI/input/MyInputGroup";

const NewContentOne = ({ addContent }) => {
  const [newContent, setNewContent] = useState({
    side1: "",
    side2: "",
    tag: "",
  });
  return (
    <>
      <MyInputGroup
        text="Side1"
        placeholder="Side1"
        value={newContent.side1}
        onChange={(e) =>
          setNewContent({ ...newContent, side1: e.target.value })
        }
      />
      <MyInputGroup
        text="Side2"
        placeholder="Side2"
        value={newContent.side2}
        onChange={(e) =>
          setNewContent({ ...newContent, side2: e.target.value })
        }
      ></MyInputGroup>
      <MyInputGroup
        text="tag"
        placeholder="tag"
        value={newContent.tag}
        onChange={(e) => setNewContent({ ...newContent, tag: e.target.value })}
      >
        <Button
          variant="outline-dark"
          onClick={(e) => {
            e.stopPropagation();
            addContent(newContent);
            setNewContent({ side1: "", side2: "", tag: "" });
          }}
        >
          Add new card
        </Button>
      </MyInputGroup>
    </>
  );
};

export default NewContentOne;
