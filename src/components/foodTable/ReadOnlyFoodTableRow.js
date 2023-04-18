import React from "react";
import { Button } from "react-bootstrap";

function ReadOnlyRow ({ ing, handleEditClick, handleDeleteClick }) {

  return (
    <tr>
      <td>{ing.ingredient}</td>
      <td>{ing.bought}</td>
      <td>{ing.used}</td>
      <td>{Math.floor(ing.bought - ing.used) + " / " + ing.measurement}</td>
      <td>
        <Button
          type="button"
          variant="info"
          onClick={(event) => handleEditClick(event, ing)}
        >
          Rediger
        </Button>
        <Button type="button" variant="danger" onClick={() => handleDeleteClick(ing.id)}>
          Slett
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;