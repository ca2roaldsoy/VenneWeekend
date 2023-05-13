import React from "react";
import { Button } from "react-bootstrap";
import { Tr, Td } from "react-super-responsive-table";

function ReadOnlyParticipents({ person, handleEditClick, handleDeleteClick }) {
  const allergiesArr = [person.lactose, person.gluten, person.other];
  const removeEmptyStringsFromAllergies = allergiesArr
    .filter((a) => a !== "")
    .join(", ");

  const daysArr = [
    person.friday,
    person.saturday,
    person.sunday,
    person.monday,
  ];
  const removeEmptyStringsFromDays = daysArr.filter((b) => b !== "").join(", ");

  return (
    <Tr>
      <Td>{person.name}</Td>
      <Td>{person.age}</Td>
      <Td>{removeEmptyStringsFromDays}</Td>
      <Td>{person.sheets}</Td>
      <Td>{removeEmptyStringsFromAllergies}</Td>
      <Td>
        {/*  <Button
          type="button"
          variant="info"
          onClick={(event) => handleEditClick(event, person)}
        >
          Rediger
        </Button> */}
        <Button
          type="button"
          variant="danger"
          onClick={() => handleDeleteClick(person.id)}
        >
          Slett
        </Button>
      </Td>
    </Tr>
  );
}

export default ReadOnlyParticipents;
