import React from "react";
import { Container } from "react-bootstrap";
import FoodForm from "./FoodForm";

function Food() {
  return (
    <Container className="containerForm menu">
      <div className="containerForm__form">
        <h1 className="text-center">Opprett meny</h1>
        <FoodForm />
      </div>
    </Container>
  );
}

export default Food;
