import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";

const schema = yup.object().shape({
  name: yup.string(),
});

function EditParticipents({
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
    <>
      <Modal show={!open} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Rediger deltaker</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <fieldset className="person">
            <legend>Personalia</legend>
            <Form.Control
              type="text"
              name="name"
              placeholder="Navn"
              {...register("name", {
                onChange: handleEditFormChange,
                value: editFormData.name,
              })}
            />
            <Form.Control
              type="number"
              name="age"
              placeholder="Alder"
              {...register("age", {
                onChange: handleEditFormChange,
                value: editFormData.age,
              })}
            />
          </fieldset>
          <fieldset>
            <legend>Dager</legend>
            <Form.Check type={"checkbox"}>
              <Form.Check.Input
                type={"checkbox"}
                value="Fredag"
                name="friday"
                {...register("friday", {
                  onChange: handleEditFormChange,
                  value: editFormData.friday,
                })}
              />
              <Form.Check.Label>Fredag</Form.Check.Label>
            </Form.Check>
            <Form.Check type={"checkbox"}>
              <Form.Check.Input
                type={"checkbox"}
                value="Lørdag"
                name="saturday"
                {...register("saturday", {
                  onChange: handleEditFormChange,
                  value: editFormData.saturday,
                })}
              />
              <Form.Check.Label>Lørdag</Form.Check.Label>
            </Form.Check>
            <Form.Check type={"checkbox"}>
              <Form.Check.Input
                type={"checkbox"}
                value="Søndag"
                name="sunday"
                {...register("sunday", {
                  onChange: handleEditFormChange,
                  value: editFormData.sunday,
                })}
              />
              <Form.Check.Label>Søndag</Form.Check.Label>
            </Form.Check>
            <Form.Check type={"checkbox"}>
              <Form.Check.Input
                type={"checkbox"}
                value="Mandag"
                name="monday"
                {...register("monday", {
                  onChange: handleEditFormChange,
                  value: editFormData.monday,
                })}
              />
              <Form.Check.Label>Mandag</Form.Check.Label>
            </Form.Check>
          </fieldset>
          <fieldset>
            <legend>Sengetøy</legend>
            <Form.Check type={"checkbox"}>
              <Form.Check.Input
                type={"checkbox"}
                name="sheets"
                onChange={handleEditFormChange}
                value={editFormData.sheets}
                /*  {...register("sheets", {
                  onChange: handleEditFormChange,
                  value: editFormData.sheets,
                })} */
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
                {...register("lactose", {
                  onChange: handleEditFormChange,
                  value: editFormData.lactose,
                })}
              />
              <Form.Check.Label>Laktose</Form.Check.Label>
            </Form.Check>
            <Form.Check type={"checkbox"}>
              <Form.Check.Input
                type={"checkbox"}
                value="gluten"
                name="gluten"
                {...register("gluten", {
                  onChange: handleEditFormChange,
                  value: editFormData.gluten,
                })}
              />
              <Form.Check.Label>Gluten</Form.Check.Label>
            </Form.Check>
            <Form.Control
              type="text"
              name="other"
              placeholder="Annet..."
              {...register("other", {
                onChange: handleEditFormChange,
                value: editFormData.other,
              })}
            />
          </fieldset>
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
      {/* 
      <tr>
        <td>
          <Form.Control
            type="text"
            name="name"
            placeholder="navn"
            {...register("name", {
              onChange: handleEditFormChange,
              value: editFormData.name,
            })}
          />
        </td>
        <td colSpan={2}></td>
        <td>
          <Button variant="success" type="submit">
            Lagre
          </Button>
          <Button variant="danger" type="button" onClick={handleCancelClick}>
            Avbryt
          </Button>
        </td>
      </tr> */}
    </>
  );
}

export default EditParticipents;
