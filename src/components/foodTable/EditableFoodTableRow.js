import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormLabel,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { Tr } from "react-super-responsive-table";

const schema = yup.object().shape({
  ingrediens: yup.string(),
});

function EditableRow({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  handleEditFormSubmit,
}) {
  const [open, setOpen] = useState(false);
  const { register } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClose = () => setOpen(true);

  return (
    <Modal show={!open} onHide={handleClose} className="admModal">
      <ModalHeader>
        <ModalTitle>Rediger melding</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <FormLabel>Ingrediens</FormLabel>
        <Form.Control
          type="text"
          name="ingredient"
          placeholder="skriv en ingredient"
          {...register("ingredient", {
            onChange: handleEditFormChange,
            value: editFormData.ingredient,
          })}
        />
        <FormLabel>Kjøpt</FormLabel>
        <Form.Control
          type="text"
          name="bought"
          placeholder="hvor mye ble kjøpt"
          {...register("bought", {
            onChange: handleEditFormChange,
            value: editFormData.bought,
          })}
        />
        <FormLabel>Brukt</FormLabel>
        <Form.Control
          type="text"
          name="used"
          placeholder="hvor mye ble brukt"
          {...register("used", {
            onChange: handleEditFormChange,
            value: editFormData.used,
          })}
        />
        <FormLabel>Målenhet (skriv inn manuelt - kg, gr, l, dl, stk)</FormLabel>
        <Form.Control
          type="text"
          name="measurement"
          placeholder="målenhet (kg, gr, l, dl, stk)"
          {...register("measurement", {
            onChange: handleEditFormChange,
            value: editFormData.measurement,
          })}
        />

        <ModalFooter>
          <Button variant="success" type="submit">
            Lagre
          </Button>
          <Button variant="danger" type="button" onClick={handleCancelClick}>
            Avbryt
          </Button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}

export default EditableRow;
