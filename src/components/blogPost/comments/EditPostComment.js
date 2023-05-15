import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "react-bootstrap";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";

const schema = yup.object().shape({
  comment: yup.string(),
  name: yup.string(),
});

function EditPostComment({
  handleEditFormSubmit,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) {
  const [open, setOpen] = useState(false);

  const { register } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClose = () => setOpen(true);

  return (
    <Modal show={!open} onHide={handleClose}>
      <ModalHeader>
        <ModalTitle>Rediger kommentar</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form.Control
          type="text"
          name="comment"
          as="textarea"
          placeholder="kommentar.."
          {...register("comment", {
            onChange: handleEditFormChange,
            value: editFormData.comment,
          })}
        />
        <Form.Control
          type="text"
          name="name"
          placeholder="navn..."
          {...register("name", {
            onChange: handleEditFormChange,
            value: editFormData.name,
          })}
        />
        <ModalFooter>
          <Button
            variant="success"
            type="submit"
            onClick={handleEditFormSubmit}
          >
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

export default EditPostComment;
