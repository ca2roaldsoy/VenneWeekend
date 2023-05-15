import React from "react";
import { Button } from "react-bootstrap";
import { Tr, Td } from "react-super-responsive-table";

function ReadOnlyPostRow({ p, handleEditClick, handleDeleteClick }) {
  return (
    <Tr>
      <Td>{p.author}</Td>
      <Td>{p.title}</Td>
      <Td>{p.message}</Td>
      <Td>
        <Button
          type="button"
          variant="info"
          onClick={(event) => handleEditClick(event, p)}
          className="admPost__edit"
        >
          Rediger
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={() => handleDeleteClick(p.id)}
          className="admPost__delete"
        >
          Slett
        </Button>
      </Td>
    </Tr>
  );
}

export default ReadOnlyPostRow;
