import React from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "react-bootstrap";

const schema = yup.object().shape({
  name: yup.string(),
});

function EditParticipents ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}){

const { register } = useForm({
  resolver: yupResolver(schema)
});

  return (
    <tr>
      <td>
      <Form.Control type="text" name="name" placeholder="navn" {...register("name", {
            onChange: handleEditFormChange, 
            value: editFormData.name
          })} />
      </td><td colSpan={2}></td>
      <td>
        <Button variant="success" type="submit">Lagre</Button>
        <Button variant="danger" type="button" onClick={handleCancelClick}>
          Avbryt
        </Button>
      </td>
    </tr>
  );
}

export default EditParticipents;