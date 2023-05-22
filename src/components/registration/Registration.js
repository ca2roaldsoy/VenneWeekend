import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { axiosURL } from "../../constants/axiosURL";

function Registration() {
  const [userReg, setUserReg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //validationSchema: schema,
    //resolver: yupResolver(schema)
  });

  const handleChange = (e) => {
    setUserReg((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };

  function onSubmit(data, event) {
    console.log("data", data);
    /* event.preventDefault() */

    axios.post(axiosURL + "register", {
      username: data.username,
      password: data.password,
    });
    /*  setUserReg([
      ...userReg,
      { username: data.username, password: data.password },
    ]); */

    /*localStorage.setItem("blogPosts", JSON.stringify(data));
        setValues(data) */
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} role="form">
      <Form.Group>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          {...register("username", {
            onChange: handleChange,
          })}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="text"
          name="password"
          {...register("password", {
            onChange: handleChange,
          })}
        />
      </Form.Group>
      <Button type="submit" role="button">
        Register
      </Button>
    </Form>
  );
}

export default Registration;
