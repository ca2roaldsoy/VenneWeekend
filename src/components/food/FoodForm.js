import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ReadOnlyMenu from "./ReadOnlyMenu";
import EditMenu from "./EditMenu";
import { Form, Button, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Accordion } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormPersist from 'react-hook-form-persist'
import Card from 'react-bootstrap/Card';
import * as yup from "yup";
import axios from "axios";

/* const schema = yup.object().shape({
  friday: yup.string(),
});
const loadedMenu = JSON.parse(localStorage.getItem("menuTable")) || []; */

function FoodForm () {

  const [menus, setMenus] = useState([]);
  const [editMenuId, setEditMenuId] = useState(null);
  const [show, setShow] = useState(false);

  const [addFormData, setAddFormData] = useState({
    friday: "",
    saturday: "",
    sunday: "",
  });

  const [editFormData, setEditFormData] = useState({
    friday: "",
    saturday: "",
    sunday: "",
  });

  /* const { watch, setValue } = useForm({
    resolver: yupResolver(schema),
   }); 

  useFormPersist("menuTable", {
    watch, 
    setValue,
  }, {    
    storage: window.localStorage
  });
 */
  useEffect(() => {
    //localStorage.setItem("menuTable", JSON.stringify(menus));
    axios.get("http://localhost:3001/foodmenu/get").then((response) => setMenus(response.data));
    }, []);  

  const handleAddFormChange = (event) => {
    event.preventDefault();

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

  const handleAddFormSubmit = () => {
    const newMenu = {
      friday: addFormData.friday,
      saturday: addFormData.saturday,
      sunday: addFormData.sunday,
    };

    axios.post("http://localhost:3001/foodmenu/insert", newMenu);
    const newMenus = [...menus, newMenu];
    setMenus(newMenus);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedIngredient = {
      id: editMenuId,
      friday: editFormData.friday,
      saturday: editFormData.saturday,
      sunday: editFormData.sunday,
    };

    axios.put(`http://localhost:3001/foodmenu/update`, editedIngredient)
    const newMenus = [...menus];
    const index = menus.findIndex((menu) => menu.id === editMenuId);
    newMenus[index] = editedIngredient;

    setMenus(newMenus);
    setEditMenuId(null);
  };

  const handleEditClick = (event, menu) => {
    event.preventDefault();
    setEditMenuId(menu.id);

    const FormValues = {
      friday: menu.friday,
      saturday: menu.saturday,
      sunday: menu.sunday,
    };

    setEditFormData(FormValues);
  };

  const handleCancelClick = () => {
    setEditMenuId(null);
  };

  const handleDeleteClick = (menuId) => {
    const newMenus = [...menus];
    const index = menus.findIndex((menu) => menu.id === menuId);

    newMenus.splice(index, 1);
    axios.delete(`http://localhost:3001/foodmenu/delete/${menuId}`)
    setMenus(newMenus);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  return (
    <>
      <Form onSubmit={handleEditFormSubmit} className="mt-5">
        <Accordion defaultActiveKey="0" alwaysOpen>
              <Accordion.Item eventKey="0">
        <Accordion.Header>2023</Accordion.Header>
        <Accordion.Body>
    <Card>
    {menus.map((menu) => (
              <>
                {editMenuId === menu.id ? (
                  <EditMenu
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyMenu
                    key={nanoid()}
                    menu={menu}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </>
            ))}
          </Card>
          </Accordion.Body>
          </Accordion.Item>
          </Accordion>
          <Button variant="primary" onClick={handleShow}> + Legg til meny</Button>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Legg til meny</ModalTitle>
        </ModalHeader>
        <ModalBody>
      <Form onSubmit={handleAddFormSubmit}>
        <Form.Control
          type="text"
          name="friday"
          placeholder="Skriv fredagens meny"
          onChange={handleAddFormChange}
          autoFocus
        />
        <Form.Control
          type="text"
          name="saturday"
          placeholder="Skriv lørdagens meny"
          onChange={handleAddFormChange}
        />
        <Form.Control
          type="text"
          name="sunday"
          placeholder="Skriv søndagens meny"
          onChange={handleAddFormChange}
        />
        <ModalFooter>
          <Button type="submit" variant="success">Lagre</Button>
        </ModalFooter>
      </Form>
        </ModalBody>
        </Modal>
    </>
  );
};

export default FoodForm;