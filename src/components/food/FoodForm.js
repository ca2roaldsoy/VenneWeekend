import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Validated from "../../formValidation/Validated";
import { foodMenu } from "../../constants/foodMenu";
import { v4 as uuidv4 } from 'uuid';

// react bootstrap
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

 // validate input fields
const schema = yup.object().shape({
  name: yup.string().required("Please enter a meal"),
}); 

function FoodForm({name}) {
  const [validated, setValidated] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  function setLocalStorage() {
     // add the array to local storage
     localStorage.setItem("acommodation", JSON.stringify(foodMenu))
  }

  useEffect(() => {
   setLocalStorage();
  }, [])

  function onSubmit(data, event) {
    console.log("data", data);

    // push data to array
    foodMenu.push(data);

    setLocalStorage();
    
    event.target.reset();
    setValidated(true);
  }

  // scroll back to top after submit
  const backToTop = () => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  const reset = () => setValidated(false);

  return (
        <>
          <Validated validated={validated} message={3} />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col lg={12}>
                <Form.Group as="section">
                  <Form.Label htmlFor="name">Matrett</Form.Label>
                  <Form.Control type="text" name="name" ref={register} />
                  {errors.name && <Form.Text>{errors.name.message}</Form.Text>}
                </Form.Group>

                <Form.Group as="section">
                  <Form.Label htmlFor="ingredients">Ingredienser</Form.Label>
                  <Form.Control type="text" name="ingredients" ref={register} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group as="section">
                  <Form.Label htmlFor="used">Antall</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="used"
                      ref={register}
                      placeholder="00"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group as="section">
                  <Form.Label htmlFor="needed">Trengte</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="needed"
                      ref={register}
                      placeholder="00"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group as="section">
                  <Form.Label htmlFor="total">+/-</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="total"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col lg={12}>
                <Form.Group className="form__btn" as="section">
                  <Button
                    type="submit"
                    role="button"
                    onClick={backToTop}
                    className="form__btn--submit"
                  >
                    SUBMIT
                  </Button>
                  <Button
                    type="reset"
                    onClick={reset}
                    role="button"
                    className="form__btn--reset"
                  >
                    Reset
                  </Button>
                </Form.Group>
              </Col>

              <Form.Group as="section">
                  <Form.Control type="hidden" name="id" ref={register} value={uuidv4()} />
                </Form.Group>
            </Row>
          </Form>
        </>
  );
}

export default FoodForm;
