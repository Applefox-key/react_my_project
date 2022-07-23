import React from "react";
import MyTable from "../UI/table/MyTable";
import MyModal from "../UI/MyModal";
import Button from "react-bootstrap/esm/Button";

const ModalFileContent = ({ dataArray, onClick, visible, setVisible }) => {
  return (
    <MyModal
      title={"Import from file"}
      subtitle={"New expressions:"}
      visible={visible}
      setVisible={setVisible}
    >
      <MyTable dataArray={dataArray} namesArray={["expression", "phrase"]} />

      <Button onClick={onClick}>Add</Button>
    </MyModal>
  );
};

export default ModalFileContent;
