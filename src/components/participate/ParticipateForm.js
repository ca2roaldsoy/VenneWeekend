import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  //Table,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { Table, Tbody, Th, Thead, Tr } from "react-super-responsive-table";
import * as yup from "yup";
import EditParticipents from "./EditParticipents";
import ReadOnlyParticipents from "./ReadOnlyParticipents";

const schema = yup.object().shape({
  name: yup.string(),
});
const loadedParticipents =
  JSON.parse(localStorage.getItem("participents")) || [];

const syncRoomSelectionItems = (updateItems) => {
  const savedColumns = JSON.parse(localStorage.getItem("RS"));
  if (!savedColumns) return;

  const updatedColumns = Object.fromEntries(
    Object.entries(savedColumns).map(([columnId, column]) => [
      columnId,
      { ...column, items: updateItems(column.items) },
    ])
  );

  localStorage.setItem("RS", JSON.stringify(updatedColumns));
};

function ParticipateForm() {
  const [participents, setParticipents] = useState(loadedParticipents);
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
    "participentFormDraft",
    {
      watch,
      setValue,
    },
    {
      storage: window.localStorage,
    }
  );

  useEffect(() => {
    localStorage.setItem("participents", JSON.stringify(participents));

    /*  axios
      .get(axiosURL + "participents/get")
      .then((response) => setParticipents(response.data)); */
  }, [participents]);

  const handleAddFormChange = (event) => {
    const { name, value } = event.target;
    setAddFormData({ ...addFormData, [name]: value });
  };

  const handleEditFormChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const isChecked = event.target.type === "checkbox" && event.target.checked;
    const checkedFieldValue = isChecked ? event.target.value : undefined;
    const fieldValue = checkedFieldValue ?? event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newParticipent = {
      id: nanoid(),
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

    //axios.post(axiosURL + "participents/insert", newParticipent);

    const newParticipents = [...participents, newParticipent];
    localStorage.setItem("participents", JSON.stringify(newParticipents));
    setParticipents(newParticipents);
    setAddFormData({
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
    setShow(false);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

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

    //axios.put(axiosURL + `participents/update`, editedParticipent);
    const newParticipents = [...participents];
    const index = participents.findIndex(
      (person) => person.id === editPersonId
    );
    newParticipents[index] = editedParticipent;

    setParticipents(newParticipents);
    syncRoomSelectionItems((items) =>
      items.map((item) =>
        item.id === String(editPersonId)
          ? { ...item, content: editedParticipent.name }
          : item
      )
    );
    setEditPersonId(null);
  };

  const handleEditClick = (event, person) => {
    event.preventDefault();

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
    const newParticipents = participents.filter(
      (person) => person.id !== personId
    );

    //axios.delete(axiosURL + `participents/delete/${personId}`);
    setParticipents(newParticipents);
    localStorage.setItem("participents", JSON.stringify(newParticipents));
    syncRoomSelectionItems((items) =>
      items.filter((item) => item.id !== String(personId))
    );
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
      <Container fluid className="participents__title">
        <h1>Påmelding</h1>
      </Container>
      <Container className="participents">
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
                    key={person.id}
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
      </Container>
    </>
  );
}

export default ParticipateForm;
