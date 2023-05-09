import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "react-bootstrap";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "react-bootstrap";

const schema = yup.object().shape({
    ingrediens: yup.string(),
  });

function EditPostRow ({key, handleEditFormSubmit, editFormData, handleEditFormChange, handleCancelClick}) {

  const [open, setOpen] = useState(false);
    
  const { register } = useForm({
      resolver: yupResolver(schema)
    });

    const handleClose = () => setOpen(true);
    
      return (
        <Modal show={!open} onHide={handleClose}>
        <ModalHeader>
          <ModalTitle>Rediger melding</ModalTitle>
        </ModalHeader>
        <ModalBody>
      <Form.Control type="text" name="author" placeholder="skriv ditt navn..." {...register("author", {
                onChange: handleEditFormChange, 
                value: editFormData.author
              })} />
        <Form.Control type="text" name="title" placeholder="tittel..." {...register("title", {
                onChange: handleEditFormChange, 
                value: editFormData.title
              })} />
        <Form.Control type="text" name="message" placeholder="melding..." {...register("message", {
                onChange: handleEditFormChange, 
                value: editFormData.message
              })} />
        <ModalFooter>
        <Button variant="success" type="submit" onClick={handleEditFormSubmit}>Lagre</Button>
            <Button variant="danger" type="button" onClick={handleCancelClick}>
              Avbryt
            </Button>
        </ModalFooter>
        </ModalBody>
        </Modal>
      );
    }

export default EditPostRow