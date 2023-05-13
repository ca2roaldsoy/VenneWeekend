import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ReadOnlyParticipents from "./ReadOnlyParticipents";
import EditParticipents from "./EditParticipents";
import {
  //Table,
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormPersist from "react-hook-form-persist";
import * as yup from "yup";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

const schema = yup.object().shape({
  name: yup.string(),
});
/* const loadedParticipents = JSON.parse(localStorage.getItem("participents")) || []; */

function ParticipateForm() {
  const [participents, setParticipents] = useState([]);
  const [editPersonId, setEditPersonId] = useState(null);
  const [show, setShow] = useState(false);

  const [addFormData, setAddFormData] = useState({
    name: "",
    age: "",
    friday: "",
    saturday: "",
    sunday: "",
    monday: "",
    sheets: "",
    lactose: "",
    gluten: "",
    other: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    age: "",
    friday: "",
    saturday: "",
    sunday: "",
    monday: "",
    sheets: "",
    days: "",
    lactose: "",
    gluten: "",
    other: "",
  });

  const { watch, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  useFormPersist(
    "participents",
    {
      watch,
      setValue,
    },
    {
      storage: window.localStorage,
    }
  );

  useEffect(() => {
    //localStorage.setItem("participents", JSON.stringify(participents));
    axios
      .get("http://localhost:3001/participents/get")
      .then((response) => setParticipents(response.data));
  }, []);

  const handleAddFormChange = (event) => {
    if (event.target.checked && event.target.name === "friday") {
      addFormData.friday = event.target.name;
    } else if (!event.target.checked && event.target.name === "friday") {
      addFormData.friday = "";
    }

    if (event.target.checked && event.target.name === "saturday") {
      addFormData.saturday = event.target.name;
    } else if (!event.target.checked && event.target.name === "saturday") {
      addFormData.saturday = "";
    }

    if (event.target.checked && event.target.name === "sunday") {
      addFormData.sunday = event.target.name;
    } else if (!event.target.checked && event.target.name === "sunday") {
      addFormData.sunday = "";
    }

    if (event.target.checked && event.target.name === "monday") {
      addFormData.monday = event.target.name;
    } else if (!event.target.checked && event.target.name === "monday") {
      addFormData.monday = "";
    }

    if (event.target.checked && event.target.name === "laktose") {
      addFormData.lactose = event.target.name;
    } else if (!event.target.checked && event.target.name === "laktose") {
      addFormData.lactose = "";
    }

    if (event.target.checked && event.target.name === "gluten") {
      addFormData.gluten = event.target.name;
    } else if (!event.target.checked && event.target.name === "gluten") {
      addFormData.gluten = "";
    }

    if (event.target.checked && event.target.name === "v") {
      addFormData.sheets = event.target.name;
    } else if (!event.target.checked && event.target.name === "v") {
      addFormData.sheets = "";
    }

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
    const newParticipent = {
      name: addFormData.name,
      age: addFormData.age,
      friday: addFormData.friday,
      saturday: addFormData.saturday,
      sunday: addFormData.sunday,
      monday: addFormData.monday,
      sheets: addFormData.sheets,
      lactose: addFormData.lactose,
      gluten: addFormData.gluten,
      other: addFormData.other,
    };

    axios.post("http://localhost:3001/participents/insert", newParticipent);
    const newParticipents = [...participents, newParticipent];
    setParticipents(newParticipents);
  };

  const handleEditFormSubmit = (event) => {
    //event.preventDefault();

    const editedParticipent = {
      id: editPersonId,
      name: editFormData.name,
      age: editFormData.age,
      friday: editFormData.friday,
      saturday: editFormData.saturday,
      sunday: editFormData.sunday,
      monday: editFormData.monday,
      sheets: editFormData.sheets,
      lactose: editFormData.lactose,
      gluten: editFormData.gluten,
      other: editFormData.other,
    };

    axios.put(`http://localhost:3001/participents/update`, editedParticipent);
    const newParticipents = [...participents];
    const index = participents.findIndex(
      (person) => person.id === editPersonId
    );
    newParticipents[index] = editedParticipent;

    setParticipents(newParticipents);
    setEditPersonId(null);
  };

  const handleEditClick = (event, person) => {
    //event.preventDefault();

    setEditPersonId(person.id);

    const FormValues = {
      name: person.name,
      age: person.age,
      friday: person.friday,
      saturday: person.saturday,
      sunday: person.sunday,
      monday: person.monday,
      sheets: person.sheets,
      lactose: person.lactose,
      gluten: person.gluten,
      other: person.other,
    };

    setEditFormData(FormValues);
  };

  const handleCancelClick = () => {
    setEditPersonId(null);
  };

  const handleDeleteClick = (personId) => {
    const newParticipents = [...participents];
    const index = participents.findIndex((person) => person.id === personId);

    newParticipents.splice(index, 1);
    axios.delete(`http://localhost:3001/participents/delete/${personId}`);
    setParticipents(newParticipents);
  };

  const glutenCount = () => {
    let glutenCounter = 0;

    participents.forEach((n) => {
      const p = Object.values(n);
      if (p.indexOf("gluten") !== -1) {
        glutenCounter++;
      }
    });

    return glutenCounter;
  };

  const lactoseCount = () => {
    let lactoseCounter = 0;

    participents.forEach((n) => {
      const p = Object.values(n);
      if (p.indexOf("laktose") !== -1) {
        lactoseCounter++;
      }
    });

    return lactoseCounter;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="addBtn">
        + Legg til deltaker
      </Button>
      <Form onSubmit={handleEditFormSubmit} className="mt-5">
        <Table>
          <Thead>
            <Tr>
              <Th>Navn</Th>
              <Th>Alder</Th>
              <Th>Antall dager</Th>
              <Th>Sengtøy</Th>
              <Th>Allergener</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {participents.map((person, i) =>
              editPersonId === person.id ? (
                <EditParticipents
                  key={i}
                  editFormData={editFormData}
                  handleEditFormChange={handleEditFormChange}
                  handleCancelClick={handleCancelClick}
                  handleEditFormSubmit={handleEditFormSubmit}
                />
              ) : (
                <ReadOnlyParticipents
                  key={nanoid()}
                  person={person}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              )
            )}
          </Tbody>
        </Table>
        <div className="d-flex mt-3">
          <div>Total: {participents.length}</div>
          <div className="pl-5">
            Gluten: {glutenCount()} | Laktose: {lactoseCount()}
          </div>
        </div>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Legg til deltaker</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleAddFormSubmit}>
            <fieldset className="person">
              <legend>Personalia</legend>
              <Form.Control
                type="text"
                required
                name="name"
                placeholder="Navn"
                onChange={handleAddFormChange}
                autoFocus
              />
              <Form.Control
                type="number"
                name="age"
                placeholder="Alder"
                onChange={handleAddFormChange}
              />
            </fieldset>
            <fieldset>
              <legend>Dager</legend>
              <Form.Check type={"checkbox"}>
                <Form.Check.Input
                  type={"checkbox"}
                  value="Fredag"
                  name="friday"
                  onChange={handleAddFormChange}
                />
                <Form.Check.Label>Fredag</Form.Check.Label>
              </Form.Check>
              <Form.Check type={"checkbox"}>
                <Form.Check.Input
                  type={"checkbox"}
                  value="Lørdag"
                  name="saturday"
                  onChange={handleAddFormChange}
                />
                <Form.Check.Label>Lørdag</Form.Check.Label>
              </Form.Check>
              <Form.Check type={"checkbox"}>
                <Form.Check.Input
                  type={"checkbox"}
                  value="Søndag"
                  name="sunday"
                  onChange={handleAddFormChange}
                />
                <Form.Check.Label>Søndag</Form.Check.Label>
              </Form.Check>
              <Form.Check type={"checkbox"}>
                <Form.Check.Input
                  type={"checkbox"}
                  value="Mandag"
                  name="monday"
                  onChange={handleAddFormChange}
                />
                <Form.Check.Label>Mandag</Form.Check.Label>
              </Form.Check>
            </fieldset>
            <fieldset>
              <legend>Sengetøy</legend>
              <Form.Check type={"checkbox"}>
                <Form.Check.Input
                  type={"checkbox"}
                  value="v"
                  name="sheets"
                  onChange={handleAddFormChange}
                />
                <Form.Check.Label>Leie av sengetøy</Form.Check.Label>
              </Form.Check>
            </fieldset>
            <fieldset className="allergies">
              <legend>Allergier</legend>
              <Form.Check type={"checkbox"}>
                <Form.Check.Input
                  type={"checkbox"}
                  value="laktose"
                  name="lactose"
                  onChange={handleAddFormChange}
                />
                <Form.Check.Label>Laktose</Form.Check.Label>
              </Form.Check>
              <Form.Check type={"checkbox"}>
                <Form.Check.Input
                  type={"checkbox"}
                  value="gluten"
                  name="gluten"
                  onChange={handleAddFormChange}
                />
                <Form.Check.Label>Gluten</Form.Check.Label>
              </Form.Check>
              <Form.Control
                type="text"
                name="other"
                placeholder="Annet..."
                onChange={handleAddFormChange}
              />
            </fieldset>
            <ModalFooter>
              <Button type="submit" variant="success">
                Lagre
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ParticipateForm;
