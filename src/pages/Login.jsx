import React from "react";
import { useState } from "react";
import { useContext } from "react";
import BaseAPI from "../API/BaseAPI";
import MyInputGroup from "../components/UI/MyInputGroup";
import { AuthContext } from "../context";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
  const router = useNavigate();
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("test@test.test");
  const [password, setPassword] = useState(1);

  const login = async (event) => {
    let response = await BaseAPI.login(email, password);
    if (response.status) {
      localStorage.setItem("Auth", "true");
      setIsAuth(true);
      router(`/manager`);
    } else alert(response.error);
  };

  return (
    <Container style={{ width: "25rem" }}>
      <Form onSubmit={login} className="my-3">
        <MyInputGroup
          value={email}
          type="email"
          placeholder="email"
          text="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <MyInputGroup
          value={password}
          type="password"
          placeholder="password"
          text="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="primary">
          Log in
        </Button>
        <p></p>
        <Button
          type="button"
          variant="outline-primary"
          onClick={() => {
            router("/signup");
          }}
        >
          Sign up
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
