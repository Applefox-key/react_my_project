import React, { useContext } from "react";
import BaseAPI from "../API/BaseAPI";
import UserProfile from "../components/users/UserProfile";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";

const SignUp = () => {
  const router = useNavigate();
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const newUser = (data) => {
    let ok = BaseAPI.createUser(data);
    if (ok) {
      setIsAuth(true);
      router("/collections/my");
    }
  };
  return (
    <div>
      <UserProfile onClick={newUser} btnName="Sign up"></UserProfile>
    </div>
  );
};

export default SignUp;
