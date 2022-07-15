import React from "react";
import AvatarGalary from "./AvatarGalary";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/Image";

const ProfileImg = (props) => {
  const changeAvatar = (url) => {
    console.log(url);

    props.setUserDataForm({ ...props.userDataForm, imgu: url });
  };
  return (
    // <div className="d-flex justify-content-center mt-2 px-5">
    <div style={{ width: "20%" }}>
      <AvatarGalary
        visible={props.visible}
        setVisible={props.setVisible}
        fileChange={changeAvatar}
      />
      <div className="mx-2 ">
        <Image
          ref={props.imgPrev}
          rounded
          src={props.userDataForm.imgu}
          style={{ width: "100%" }}
          // style={{ width: "250px" }}
        />
        <Button
          onClick={() => {
            props.setVisible(true);
          }}
        >
          Choose an avatar
        </Button>
      </div>
    </div>
    // </div>
  );
};

export default ProfileImg;
