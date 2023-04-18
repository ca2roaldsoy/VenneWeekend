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
import Axios from "axios";

// validate input field
const schema = yup.object().shape({
  userName: yup.string().required("Please enter your username"),
  message: yup
    .string()
});

/* const getForm = () => {
    const storedValues = localStorage.getItem("blogPosts");
    if (!storedValues)
      return {
        name: "",
        title: "",
        message: ""
      };
    return JSON.parse(storedValues);
  }; */

function PostForm() {

const [values, setValues] = useState([]);

/* useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(values));
  }, [values]); */

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
    /* event.preventDefault() */

    Axios.post("http://localhost:3001/post/insert", {author: data.userName, title: data.title, message: data.message});
    setValues([...values, {author: data.userName, title: data.title, message: data.message }])

    localStorage.setItem("blogPosts", JSON.stringify(data));
    setValues(data)

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

         <Form.Label htmlFor="title">Tittel</Form.Label>
          <Form.Control type="text" name="title" {...register("title", {
            onChange: handleChange, 
            value: values.title
          })} />
         {errors.message && <Form.Text>{errors.message.message}</Form.Text>}

         <Form.Label htmlFor="message">Melding</Form.Label>
          <Form.Control type="text" name="message" {...register("message", {
            onChange: handleChange, 
            value: values.message
          })} />
         {errors.message && <Form.Text>{errors.message.message}</Form.Text>}
        </Form.Group>

        <Button type="submit" role="button">
          Add Post
        </Button>
      </Form>
    </>
  );
}

export default PostForm;