import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { blogPosts } from "../../constants/blogPosts";
import useFormPersist from 'react-hook-form-persist'

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

const getForm = () => {
    const storedValues = localStorage.getItem("blogPosts");
    if (!storedValues)
      return {
        name: "",
      };
    return JSON.parse(storedValues);
  };

function PostForm() {

const [values, setValues] = useState(getForm);

useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(values));
  }, [values]);

const { register, handleSubmit, formState:{errors}} = useForm({
    //validationSchema: schema,
    resolver: yupResolver(schema)
  });

  const handleChange = (e) => {
    setValues((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }))
  }

  function onSubmit(data, event) {
    console.log("data", data);

    localStorage.setItem("blogPosts", JSON.stringify(data));

  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} role="form">
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control type="text" name="userName" {...register("userName", {
            onChange: handleChange, 
            value: values.name
          })} />
         {errors.userName && <Form.Text>{errors.userName.message}</Form.Text>}
        </Form.Group>

        <Button type="submit" role="button">
          Add Post
        </Button>
      </Form>
    </>
  );
}

export default PostForm;