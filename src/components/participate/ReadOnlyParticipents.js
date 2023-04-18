import React from "react";
import { Button } from "react-bootstrap";

function ReadOnlyParticipents({ person, handleEditClick, handleDeleteClick}) {

  const arr = [person.lactose, person.gluten, person.other];
  const removeEmptyStrings = arr.filter(a => a !== "").join(", ");

  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.sheets}</td>
      <td>{removeEmptyStrings}</td>
      <td>
        <Button
          type="button"
          variant="info"
          onClick={(event) => handleEditClick(event, person)}
        >
          Rediger
        </Button>
        <Button type="button" variant="danger" onClick={() => handleDeleteClick(person.id)}>
          Slett
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyParticipents;