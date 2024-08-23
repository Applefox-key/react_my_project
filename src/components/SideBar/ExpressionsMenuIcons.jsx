import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { TbTextPlus } from "react-icons/tb";
import { TfiImport, TfiExport } from "react-icons/tfi";
import { FiUploadCloud, FiDownloadCloud } from "react-icons/fi";
import { AiOutlineRollback, AiOutlineDelete } from "react-icons/ai";
import ExpModalCommand from "./ExpModalCommand";

const ExpressionsMenuIcons = ({ setExpressions, expressionsActions }) => {
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
      <button title="add one" onClick={expressionsActions.addNew}>
        <GoPlus />
      </button>
      <button title="add some" onClick={() => modal("list")}>
        <TbTextPlus />
      </button>
      <button title="Add from the file" onClick={() => modal("file")}>
        <FiUploadCloud />
      </button>{" "}
      <button title="Delete" onClick={expressionsActions.deleteMode}>
        <AiOutlineDelete />
      </button>{" "}
      <button title="Download" onClick={expressionsActions.downloadMode}>
        <FiDownloadCloud />
      </button>{" "}
      <button title="Back to training" onClick={() => router("/training")}>
        <AiOutlineRollback />
      </button>{" "}
    </>
  );
};

export default ExpressionsMenuIcons;
