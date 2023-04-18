import React from "react";
import { Container} from "react-bootstrap";
import FoodForm from "./FoodForm";

function Food() {
    return (
        <Container className="containerForm">
          <div className="containerForm__form">
            <h2 className="text-center">Opprett meny</h2>
            <FoodForm />
          </div> 
        </Container>
      );
}


export default Food;