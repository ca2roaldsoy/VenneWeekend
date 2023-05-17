import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./ReadOnlyFoodTableRow";
import EditableRow from "./EditableFoodTableRow";
import {
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Container,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormPersist from "react-hook-form-persist";
import * as yup from "yup";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";

const schema = yup.object().shape({
  ingredient: yup.string(),
});
//const loadedIngredients = JSON.parse(localStorage.getItem("foodTable")) || [];

function FoodTable() {
  const [ingredients, setIngredients] = useState([]);
  const [editIngId, setEditIngId] = useState(null);
  const [show, setShow] = useState(false);

  const [addFormData, setAddFormData] = useState({
    ingredient: "",
    bought: "",
    used: "",
    measurement: "",
  });

  const [editFormData, setEditFormData] = useState({
    ingredient: "",
    bought: "",
    used: "",
    measurement: "",
  });

  const { watch, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  useFormPersist(
    "foodtable",
    {
      watch,
      setValue,
    },
    {
      storage: window.localStorage,
    }
  );

  useEffect(() => {
    //localStorage.setItem("foodTable", JSON.stringify(ingredients));
    axios
      .get("http://localhost:3001/foodtable/get")
      .then((response) => setIngredients(response.data));
  }, []);

  const handleAddFormChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    const newIngredient = {
      ingredient: addFormData.ingredient,
      bought: addFormData.bought,
      used: addFormData.used,
      measurement: addFormData.measurement,
    };

    axios.post("http://localhost:3001/foodtable/insert", newIngredient);
    const newIngredients = [...ingredients, newIngredient];
    setIngredients(newIngredients);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedIngredient = {
      id: editIngId,
      ingredient: editFormData.ingredient,
      bought: editFormData.bought,
      used: editFormData.used,
      measurement: editFormData.measurement,
    };

    axios.put(`http://localhost:3001/foodtable/update`, editedIngredient);
    const newingredients = [...ingredients];
    const index = ingredients.findIndex((ing) => ing.id === editIngId);
    newingredients[index] = editedIngredient;

    setIngredients(newingredients);
    setEditIngId(null);
  };

  const handleEditClick = (event, ing) => {
    event.preventDefault();
    setEditIngId(ing.id);

    const FormValues = {
      ingredient: ing.ingredient,
      bought: ing.bought,
      used: ing.used,
      measurement: ing.measurement,
    };

    setEditFormData(FormValues);
  };

  const handleCancelClick = () => {
    setEditIngId(null);
  };

  const handleDeleteClick = (ingId) => {
    const newingredients = [...ingredients];
    const index = ingredients.findIndex((ing) => ing.id === ingId);

    newingredients.splice(index, 1);
    axios.delete(`http://localhost:3001/foodtable/delete/${ingId}`);
    setIngredients(newingredients);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container fluid className="foodTable__title">
        <h1>Mattabell</h1>
      </Container>
      <Container className="foodTable">
        <Button variant="primary" onClick={handleShow}>
          + Legg til ingredient
        </Button>
        <Form onSubmit={handleEditFormSubmit} className="mt-5">
          <Table>
            <Thead>
              <Tr>
                <Th>Ingredient</Th>
                <Th>Kjøpt</Th>
                <Th>Brukt</Th>
                <Th>Total</Th>
                <Th>Handling</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ingredients.map((ing) =>
                editIngId === ing.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                    handleEditFormSubmit={handleEditFormSubmit}
                  />
                ) : (
                  <ReadOnlyRow
                    key={nanoid()}
                    ing={ing}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )
              )}
            </Tbody>
          </Table>
        </Form>

        <Modal show={show} onHide={handleClose}>
          <ModalHeader closeButton>
            <ModalTitle>Legg til ingredient</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleAddFormSubmit}>
              <Form.Control
                type="text"
                required
                name="ingredient"
                placeholder="Skriv en ingredient"
                onChange={handleAddFormChange}
                autoFocus
              />
              <Form.Control
                type="text"
                name="bought"
                placeholder="Hvor mye ble kjøpt inn"
                onChange={handleAddFormChange}
              />
              <Form.Control
                type="text"
                name="used"
                placeholder="Hvor mye ble brukt"
                onChange={handleAddFormChange}
              />
              <Form.Control
                as="select"
                name="measurement"
                onChange={handleAddFormChange}
              >
                <option defaultValue="select">Velg målenhet</option>
                <option value="stk" name="stk">
                  STK
                </option>
                <option value="kg" name="kg">
                  KG
                </option>
                <option value="gr" name="gr">
                  GR
                </option>
                <option value="l" name="l">
                  L
                </option>
                <option value="dl" name="dl">
                  DL
                </option>
              </Form.Control>
              <ModalFooter>
                <Button type="submit" variant="success">
                  Lagre
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
}

export default FoodTable;
