import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineAddToPhotos } from "react-icons/md";
import { TbFileImport } from "react-icons/tb";
import { AiOutlineRollback } from "react-icons/ai";
import ExpModalCommand from "./ExpModalCommand";

const ExpressionsMenuIcons = ({ setExpressions, addOne }) => {
  const [mod, setMod] = useState(false);
  const modal = (el) => {
    setMod(el);
  };
  const router = useNavigate();
  return (
    <>
      {mod ? (
        <ExpModalCommand
          mod={mod}
          setMod={setMod}
          setExpressions={setExpressions}
        />
      ) : (
        <></>
      )}
      <button title="add one" onClick={addOne}>
        <MdOutlineAddBox />
      </button>
      <button title="add some" onClick={() => modal("list")}>
        <MdOutlineAddToPhotos />
      </button>
      <button title="Add from the file" onClick={() => modal("file")}>
        <TbFileImport />
      </button>{" "}
      <button title="Back to training" onClick={() => router("/training")}>
        <AiOutlineRollback />
      </button>{" "}
    </>
  );
};

export default ExpressionsMenuIcons;
