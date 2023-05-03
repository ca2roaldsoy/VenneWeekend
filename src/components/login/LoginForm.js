import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { FormText } from "react-bootstrap";

// validate input field
const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required(),
});

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState("");

  axios.defaults.withCredentials = true;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { localStoreUser } = useContext(AdminContext);
  const history = useNavigate();

  function onSubmit(data, event) {
    console.log("data", data);

    axios
      .post("http://localhost:3001/login", {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        if (!response.data.auth) {
          setLoggedIn(response.data.message);
          history("/");
        } else {
          setLoggedIn("");
          localStorage.setItem("token", response.data.token);
          localStoreUser(response.data.auth);
          history("/home");
        }
      });

    // reset field after login
    event.target.reset();
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} role="form">
        <Form.Group>
          <Form.Label htmlFor="username" required>
            Brukernavn
          </Form.Label>
          <Form.Control
            type="text"
            name="username"
            {...register("username", {
              onChange: (e) => setUsername(e.target.value),
            })}
          />
          {errors.username && <Form.Text>{errors.username.message}</Form.Text>}
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password" required>
            Passord
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            {...register("password", {
              onChange: (e) => setPassword(e.target.value),
            })}
          />
          {errors.password && <Form.Text>{errors.password.message}</Form.Text>}
        </Form.Group>

        <Button type="submit" role="button">
          Logg Inn
        </Button>
        <FormText>{loggedIn}</FormText>
      </Form>
    </>
  );
}

export default LoginForm;
