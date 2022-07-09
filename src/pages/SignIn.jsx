import React, { useContext } from "react";
import BaseAPI from "../API/BaseAPI";
import UserProfile from "../components/UserProfile";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";

const SignIn = () => {
  const router = useNavigate();
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const newUser = (data) => {
    let ok = BaseAPI.createUser(data);
    if (ok) {
      setIsAuth(true);
      router = "/collections";
    }
  };
  return (
    <div>
      <UserProfile onClick={newUser} btnName="Sign in"></UserProfile>
    </div>
  );
};

export default SignIn;
