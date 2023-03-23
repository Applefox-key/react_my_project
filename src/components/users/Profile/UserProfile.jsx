import React, { useState, useEffect } from "react";

import imgProfile from "../../../img/profile.ico";
import Form from "react-bootstrap/Form";
import ProfileImg from "./ProfileImg";

import ProfileData from "./ProfileData";

import cl from "./users.module.css";

const UserProfile = ({ userData, onClick, btnName }) => {
  const [visible, setVisible] = useState(false);
  const [userDataForm, setUserDataForm] = useState({
    name: "",
    email: "",
    img: imgProfile,
    password: "",
  });

  useEffect(() => {
    if (!userData) return;
    const ud = userData.img ? userData.img : imgProfile;
    setUserDataForm({ ...userData, "img": ud });
  }, [userData]);

  return (
    <Form
      className={cl.profileForm}
      onSubmit={(event) => {
        event.preventDefault();
        onClick(userDataForm);
      }}>
      <div className="d-flex justify-content-center px-1 flex-wrap ">
        <ProfileImg
          userDataForm={userDataForm}
          setUserDataForm={setUserDataForm}
          visible={visible}
          setVisible={setVisible}
        />
        <div>
          <ProfileData
            userDataForm={userDataForm}
            setUserDataForm={setUserDataForm}
            passRequired={btnName === "Sign up"}
          />
          {/* <AnimatedBtn type="submit" title={btnName} /> */}

          {/* <Button as="input" type="submit" value={btnName} /> */}
        </div>{" "}
      </div>
    </Form>
  );
};

export default UserProfile;
