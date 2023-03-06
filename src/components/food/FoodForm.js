import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useFormPersist from 'react-hook-form-persist'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";


function FoodForm() {

const loadedIngredients = JSON.parse(localStorage.getItem("foodMenu")) || [];  //new  
const [ingredients, setIngredients] = useState(loadedIngredients);
 
//validate input field
 const schema = yup.object().shape({
  title: yup.string().required("Please enter a name"),
}); 

 const { register, handleSubmit, formState:{errors}, watch, setValue } = useForm({
   resolver: yupResolver(schema),
  }); 

  useFormPersist("foodMenu", {
    watch, 
    setValue,
  }, {    
    storage: window.localStorage
  });

  useEffect(() => {
    localStorage.setItem("foodMenu", JSON.stringify(ingredients));
    }, [ingredients]);  

  function onSubmit(data, event) {
    console.log("data", data); 
    
  const newIngredient = {
      id: new Date().getTime(),
      text: data,
  };


    const json = JSON.stringify(newIngredient);
    localStorage.setItem("foodMenu", json); 
   
  }

  function addInputOnBtnClick () {
      setIngredients(ingredients.concat(<Inputs key={ingredients.length} id={ingredients.length} />))
  }

  const Inputs = () => {
    return (
      <Form.Group>
        <Form.Label htmlFor={"ingredients"+ingredients.length}>Ingrediens</Form.Label>
        <Form.Control type="text" name={"ingredients"+ingredients.length} {...register("ingredients"+ingredients.length)} />
   {errors.ingredients && <Form.Text>{errors.ingredients.message}</Form.Text>}
        <Button onClick={removeInputOnBtnClick}>
        Fjern ingrediens
      </Button>
      </Form.Group>
    )
  }

  function removeInputOnBtnClick (id) {
    const updatedIngredients = [...ingredients].filter((ing) => ing.id !== id);
    setIngredients(updatedIngredients);
  }
  

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} role="form">
        <Form.Group>
          <Form.Label htmlFor="title">Tittel</Form.Label>
          <Form.Control type="text" name="title" {...register("title")} />
          {errors.title && <Form.Text>{errors.title.message}</Form.Text>}  
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="ingredients">Ingredients</Form.Label>
          <Form.Control type="text" name="ingredients" {...register("ingredients")} />
          {errors.ingredients && <Form.Text>{errors.ingredients.message}</Form.Text>}
        </Form.Group>

      {ingredients}

        <Button onClick={addInputOnBtnClick}>
          Legg til ingrediens
        </Button>

        <Button type="submit" role="button">
          Lagre
        </Button>
      </Form>
    </>
  ); 
  }

export default FoodForm;
