import React from "react";
import AvatarGalery from "./AvatarGalery";

import Image from "react-bootstrap/Image";
import cl from "./users.module.css";

const ProfileImg = (props) => {
  const changeAvatar = (url) => {
    props.setUserDataForm({ ...props.userDataForm, img: url });
  };
  return (
    <div className={cl.avatarDiv}>
      <AvatarGalery
        visible={props.visible}
        setVisible={props.setVisible}
        fileChange={changeAvatar}
      />
      <div>
        <Image
          onClick={() => {
            props.setVisible(true);
          }}
          rounded
          src={props.userDataForm.img}
          className={cl.avatarProfile}
        />
      </div>
    </div>
  );
};

export default ProfileImg;
