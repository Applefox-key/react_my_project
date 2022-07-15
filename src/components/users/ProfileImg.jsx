import React from "react";
import AvatarGalary from "./AvatarGalary";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/Image";
import cl from "./users.module.css";

const ProfileImg = (props) => {
  const changeAvatar = (url) => {
    console.log(url);

    props.setUserDataForm({ ...props.userDataForm, imgu: url });
  };
  return (
    // <div className="d-flex justify-content-center mt-2 px-5">
    <div className={cl.avatarDiv}>
      <AvatarGalary
        visible={props.visible}
        setVisible={props.setVisible}
        fileChange={changeAvatar}
      />
      <div>
        <Image
          ref={props.imgPrev}
          rounded
          src={props.userDataForm.imgu}
          className={cl.avatarProfile}
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
