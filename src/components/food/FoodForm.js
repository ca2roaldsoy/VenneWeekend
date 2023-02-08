import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as yup from "yup";
import { Formik } from 'formik';
import { foodMenu } from "../../constants/foodMenu"
import Validated from "../formValidation/Validated";
import { v4 as uuidv4 } from 'uuid';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zip: yup.string().required(),
  terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

function FoodForm() {
  const [validated, setValidated] = useState(false);

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
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit()}
      initialValues={{
        meal: '',
        lastName: '',
        username: '',
        city: '',
        state: '',
        zip: '',
        terms: false,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <>
        <Validated validated={validated} message={3} />
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationFormikName">
              <Form.Label>Matrett</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Matrett"
                  name="meal"
                  value={values.meal}
                  onChange={handleChange}
                  isInvalid={!!errors.meal}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.meal}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormikUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormik03">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={values.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
              />

              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik04">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                name="state"
                value={values.state}
                onChange={handleChange}
                isInvalid={!!errors.state}
              />
              <Form.Control.Feedback type="invalid">
                {errors.state}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik05">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zip"
                name="zip"
                value={values.zip}
                onChange={handleChange}
                isInvalid={!!errors.zip}
              />

              <Form.Control.Feedback type="invalid">
                {errors.zip}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik0"
            />
          </Form.Group>
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
                  <Form.Control type="hidden" name="id" value={uuidv4()} />
                </Form.Group>
        </Form>
        </>
      )}
    </Formik>
  );
}


export default FoodForm;
