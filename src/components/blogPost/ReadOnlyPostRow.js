import React from "react";
import { Button } from "react-bootstrap";

function ReadOnlyPostRow ({ p, handleEditClick, handleDeleteClick }) {

  return (
    <tr>
      <td>{p.author}</td>
      <td>{p.title}</td>
      <td>{p.message}</td>
      <td>
        <Button
          type="button"
          variant="info"
          onClick={(event) => handleEditClick(event, p)}
        >
          Rediger
        </Button>
        <Button type="button" variant="danger" onClick={() => handleDeleteClick(p.id)}>
          Slett
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyPostRow;