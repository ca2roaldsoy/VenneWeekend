import React from "react";
import { Button } from "react-bootstrap";
import { Td, Tr } from "react-super-responsive-table";

function ReadOnlyRow({ ing, handleEditClick, handleDeleteClick }) {
  return (
    <Tr>
      <Td>{ing.ingredient}</Td>
      <Td>{ing.bought}</Td>
      <Td>{ing.used}</Td>
      <Td>{Math.floor(ing.bought - ing.used) + " / " + ing.measurement}</Td>
      <Td>
        <Button
          type="button"
          variant="info"
          onClick={(event) => handleEditClick(event, ing)}
        >
          Rediger
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={() => handleDeleteClick(ing.id)}
          className="ml-3"
        >
          Slett
        </Button>
      </Td>
    </Tr>
  );
}

export default ReadOnlyRow;
