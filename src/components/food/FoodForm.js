import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import * as yup from "yup";
import EditMenu from "./EditMenu";
import ReadOnlyMenu from "./ReadOnlyMenu";

const schema = yup.object().shape({
  friday: yup.string(),
});
const loadedMenu = JSON.parse(localStorage.getItem("menuTable")) || [];

function FoodForm() {
  const [menus, setMenus] = useState(loadedMenu);
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

  const { watch, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  useFormPersist(
    "menuTable",
    {
      watch,
      setValue,
    },
    {
      storage: window.localStorage,
    }
  );

  useEffect(() => {
    localStorage.setItem("menuTable", JSON.stringify(menus));
    /*   axios
      .get(axiosURL + "foodmenu/get")
      .then((response) => setMenus(response.data)); */
  }, []);

  const handleAddFormChange = (event) => {
    const { name, value } = event.target;
    setAddFormData({ ...addFormData, [name]: value });
  };

  const handleEditFormChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newMenu = {
      id: nanoid(),
      friday: addFormData.friday,
      saturday: addFormData.saturday,
      sunday: addFormData.sunday,
      year: addFormData.year,
    };

    /*   axios.post(axiosURL + "foodmenu/insert", newMenu); */
    const newMenus = [...menus, newMenu];
    localStorage.setItem("menuTable", JSON.stringify(newMenus));
    setMenus(newMenus);
    setAddFormData({ friday: "", saturday: "", sunday: "", year: "" });
    setShow(false);
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

    //axios.put(axiosURL + `foodmenu/update`, editedIngredient);
    const newMenus = [...menus];
    const index = menus.findIndex((menu) => menu.id === editMenuId);
    newMenus[index] = editedIngredient;

    localStorage.setItem("menuTable", JSON.stringify(newMenus));
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
    const newMenus = menus.filter((person) => person.id !== menuId);

    // axios.delete(axiosURL + `foodmenu/delete/${menuId}`);
    setMenus(newMenus);
    localStorage.setItem("menuTable", JSON.stringify(newMenus));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function menuYear() {
    const currentYear = new Date().getFullYear().toString();
    const years = Array.from(
      new Set([...menus.map((menu) => menu.year).filter(Boolean), currentYear])
    ).sort();

    return years.map((year) => (
      <Accordion defaultActiveKey="0" key={year} className="menu__yearAcc">
        <Accordion.Item eventKey={year}>
          <Accordion.Header>{year}</Accordion.Header>
          <Accordion.Body>
            <Card>
              {menus.map((menu) =>
                menu.year === year ? (
                  editMenuId === menu.id ? (
                    <EditMenu
                      key={menu.id}
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyMenu
                      key={menu.id}
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
    ));
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
