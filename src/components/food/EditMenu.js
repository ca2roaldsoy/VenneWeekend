import React from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Container } from "react-bootstrap";

const schema = yup.object().shape({
  ingrediens: yup.string(),
});

function EditMenu({ editFormData, handleEditFormChange, handleCancelClick }) {
  const { register } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Card.Header>Fredag</Card.Header>
      <Card.Title>
        <Form.Control
          type="text"
          name="friday"
          placeholder="skriv fredagens meny"
          {...register("friday", {
            onChange: handleEditFormChange,
            value: editFormData.friday,
          })}
        />
      </Card.Title>
      <Card.Header>Lørdag</Card.Header>
      <Card.Title>
        <Form.Control
          type="text"
          name="saturday"
          placeholder="skriv lørdagens meny"
          {...register("saturday", {
            onChange: handleEditFormChange,
            value: editFormData.saturday,
          })}
        />
      </Card.Title>
      <Card.Header>Søndag</Card.Header>
      <Card.Title>
        <Form.Control
          type="text"
          name="sunday"
          placeholder="skriv søndagens meny"
          {...register("sunday", {
            onChange: handleEditFormChange,
            value: editFormData.sunday,
          })}
        />
      </Card.Title>
      <Card.Header>Årstall</Card.Header>
      <Card.Title>
        <Form.Control
          type="text"
          name="year"
          readOnly={true}
          value={editFormData.year}
        />
      </Card.Title>
      <Card.Title className="menu__actionBtns">
        <Button variant="success" type="submit">
          Lagre
        </Button>
        <Button variant="danger" type="button" onClick={handleCancelClick}>
          Avbryt
        </Button>
      </Card.Title>
    </>
  );
}

export default EditMenu;
