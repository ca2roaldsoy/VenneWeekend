import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ReadOnlyMenu from "./ReadOnlyMenu";
import EditMenu from "./EditMenu";
import {
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Accordion,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormPersist from "react-hook-form-persist";
import Card from "react-bootstrap/Card";
import * as yup from "yup";
import axios from "axios";
import { axiosURL } from "../../constants/axiosURL";

/* const schema = yup.object().shape({
  friday: yup.string(),
});
const loadedMenu = JSON.parse(localStorage.getItem("menuTable")) || []; */

function FoodForm() {
  const [menus, setMenus] = useState([]);
  const [editMenuId, setEditMenuId] = useState(null);
  const [show, setShow] = useState(false);

  const [addFormData, setAddFormData] = useState({
    friday: "",
    saturday: "",
    sunday: "",
    year: "",
  });

  const [editFormData, setEditFormData] = useState({
    friday: "",
    saturday: "",
    sunday: "",
    year: "",
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
    axios
      .get(axiosURL + "foodmenu/get")
      .then((response) => setMenus(response.data));
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
      year: addFormData.year,
    };

    axios.post(axiosURL + "foodmenu/insert", newMenu);
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
      year: editFormData.year,
    };

    axios.put(axiosURL + `foodmenu/update`, editedIngredient);
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
      year: menu.year,
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
    axios.delete(axiosURL + `foodmenu/delete/${menuId}`);
    setMenus(newMenus);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(menus);

  function menuYear() {
    const yearArr = [];
    for (let i = 2; i < 6; i++) {
      yearArr.push(
        <Accordion defaultActiveKey="0" key={i} className="menu__yearAcc">
          <Accordion.Item eventKey={i}>
            <Accordion.Header>202{i}</Accordion.Header>
            <Accordion.Body>
              <Card>
                {menus.map((menu) =>
                  menu.year === `202${i}` ? (
                    editMenuId === menu.id ? (
                      <EditMenu
                        key={i}
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
                    )
                  ) : null
                )}
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );
    }

    return yearArr;
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="menuAddBtn">
        + Legg til meny
      </Button>
      <Form onSubmit={handleEditFormSubmit} className="mt-5">
        {menuYear()}
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
            <Form.Control
              type="text"
              name="year"
              placeholder="Årstall"
              onChange={handleAddFormChange}
            />
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

export default FoodForm;
