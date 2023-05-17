import React from "react";
import { Container } from "react-bootstrap";
import FoodForm from "./FoodForm";

function Food() {
  return (
    <>
      <Container fluid className="food__title">
        <h1 className="text-center">Opprett meny</h1>
      </Container>
      <Container className="containerForm menu">
        <div className="containerForm__form">
          <FoodForm />
        </div>
      </Container>
    </>
  );
}

export default Food;
