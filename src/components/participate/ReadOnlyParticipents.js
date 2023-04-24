import React from "react";
import { Button } from "react-bootstrap";

function ReadOnlyParticipents({ person, handleEditClick, handleDeleteClick}) {

  console.log(person);

  const allergiesArr = [person.lactose, person.gluten, person.other];
  const removeEmptyStringsFromAllergies = allergiesArr.filter(a => a !== "").join(", ");

  const daysArr = [person.friday, person.saturday, person.sunday, person.monday];
  const removeEmptyStringsFromDays = daysArr.filter(b => b !== "").join(", ");

  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.age}</td>
      <td>{removeEmptyStringsFromDays}</td>
      <td>{person.sheets}</td>
      <td>{removeEmptyStringsFromAllergies}</td>
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