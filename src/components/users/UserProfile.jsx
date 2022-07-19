import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import imgProfile from "../../img/profile.ico";
import Form from "react-bootstrap/Form";
import ProfileImg from "./ProfileImg";
import ProfileText from "./ProfileText";
import cl from "./users.module.css";

const UserProfile = ({ userData, onClick, btnName }) => {
  const [visible, setVisible] = useState(false);
  const [userDataForm, setUserDataForm] = useState({
    name: "",
    email: "",
    imgu: imgProfile,
    passexpression: "",
  });

  useEffect(() => {
    if (!userData) return;
    setUserDataForm({ ...userData });
  }, [userData]);

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        onClick(userDataForm);
      }}
    >
      <div className="d-flex justify-content-center px-1 flex-wrap">
        <ProfileImg
          userDataForm={userDataForm}
          setUserDataForm={setUserDataForm}
          visible={visible}
          setVisible={setVisible}
        />
        <div style={{ width: "80%" }}>
          <ProfileText
            userDataForm={userDataForm}
            setUserDataForm={setUserDataForm}
          />
          <Button as="input" type="submit" value={btnName} />
        </div>
      </div>
    </Form>
  );
};

export default UserProfile;
