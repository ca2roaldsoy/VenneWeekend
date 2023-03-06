import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { yupResolver } from "@hookform/resolvers/yup";

// validate input field
const schema = yup.object().shape({
  userName: yup.string().required("Please enter your username"),
  password: yup
    .string()
    .min(8, "Password must contain of least 8 characters")
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain of one lower case letter, one uppercase letter and one number"
    ),
});

function LoginForm() {
  const { register, handleSubmit, formState:{errors} } = useForm({
    //validationSchema: schema,
    resolver: yupResolver(schema)
  });
  const { localStoreUser } = useContext(AdminContext);
  const history = useNavigate();

  function onSubmit(data, event) {
    console.log("data", data);

    localStoreUser(data.userName);
    history("/home");

    // reset field after login
    event.target.reset();
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} role="form">
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control type="text" name="userName" {...register("userName")} />
         {errors.userName && <Form.Text>{errors.userName.message}</Form.Text>}
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control type="password" name="password" {...register("password")}  />
          {errors.password && <Form.Text>{errors.password.message}</Form.Text>}
        </Form.Group>

        <Button type="submit" role="button">
          Logg Inn
        </Button>
      </Form>
    </>
  );
}

export default LoginForm;
