import React from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "react-bootstrap";

const schema = yup.object().shape({
  ingrediens: yup.string(),
});

function EditableRow ({
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
      <Form.Control type="text" name="ingredient" placeholder="skriv en ingredient" {...register("ingredient", {
            onChange: handleEditFormChange, 
            value: editFormData.ingredient
          })} />
      </td>
      <td>
      <Form.Control type="text" name="bought" placeholder="hvor mye ble kjøpt" {...register("bought", {
            onChange: handleEditFormChange, 
            value: editFormData.bought
          })} />
      </td>
      <td>
      <Form.Control type="text" name="used" placeholder="hvor mye ble brukt" {...register("used", {
            onChange: handleEditFormChange, 
            value: editFormData.used
          })} />
      </td>
      <td>
      <Form.Control type="text" name="measurement" placeholder="målenhet (kg, gr, l, dl, stk)" {...register("measurement", {
            onChange: handleEditFormChange, 
            value: editFormData.measurement
          })} />
      </td>
      <td>
        <Button variant="success" type="submit">Lagre</Button>
        <Button variant="danger" type="button" onClick={handleCancelClick}>
          Avbryt
        </Button>
      </td>
    </tr>
  );
}

export default EditableRow;