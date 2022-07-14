import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import MyModal from "../UI/MyModal";
import Button from "react-bootstrap/esm/Button";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";
import MySpinner from "../UI/MySpinner";
import Form from "react-bootstrap/Form";
import { useRef } from "react";

const AvatarGalary = ({ visible, setVisible, fileChange }) => {
  const [avatarUrlList, setAvatarUrlList] = useState([]);
  const [choice, setChoice] = useState({ name: "", url: "" });
  const [getAvatarList, isLoading, error] = useQuery(async () => {
    setAvatarUrlList(await BaseAPI.getAvatarUrlList());
  });

  useEffect(() => {
    getAvatarList();
  }, []);

  const imgPreview = (e) => {
    let img = e.target;
    const [file] = img.files;
    if (file) {
      fileChange(URL.createObjectURL(file));
    }
  };
  return (
    <MyModal
      title={"Import from file"}
      subtitle={"Сlick on the picture or choose your own"}
      visible={visible}
      setVisible={setVisible}
    >
      <Form.Control type="file" onChange={imgPreview} />

      {isLoading ? (
        <MySpinner />
      ) : (
        <div className="d-flex p-2 flex-wrap justify-content-center">
          {avatarUrlList.map((elem) => (
            <div key={elem.name}>
              <Image
                style={{ width: "100px", height: "100px" }}
                className="mx-2"
                src={elem.url}
                onClick={(e) => {
                  fileChange(elem.url);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </MyModal>
  );
};

export default AvatarGalary;
