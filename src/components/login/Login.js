import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AdminContext } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";

// validate input field
const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup
    .string()
    .min(8, "Password must contain of least 8 characters")
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain of one lower case letter, one uppercase letter and one number"
    ),
});

function Login() {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });
  const { localStoreUser } = useContext(AdminContext);
  const history = useNavigate();

  function onSubmit(data, event) {
    console.log("data", data);

    localStoreUser(data.username);
    history("/");

    // reset field after login
    event.target.reset();
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} role="form">
        <Form.Group>
          <Form.Label htmlFor="username">Brukernavn</Form.Label>
          <Form.Control type="text" name="username" ref-setter={register()} />
         {/*  {errors.username && <Form.Text>{errors.username.message}</Form.Text>} */}
        </Form.Group>
 
        <Form.Group>
          <Form.Label htmlFor="password">Passord</Form.Label>
          <Form.Control type="password" name="password" ref-setter={register()}/>
        {/*   {errors.password && <Form.Text>{errors.password.message}</Form.Text>} */}
        </Form.Group>

        <Button type="submit" role="button">
          Logg Inn
        </Button>
      </Form>
    </>
  );
}

export default Login;
