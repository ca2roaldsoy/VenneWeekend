import React from "react";
import { Button, Card } from "react-bootstrap";

function ReadOnlyPostComment({ p, handleEditClick, handleDeleteClick }) {
  console.log(p);
  return (
    <>
      <Card.Header>{p.name}</Card.Header>
      <Card.Body>{p.comments}</Card.Body>
      <Button
        type="button"
        variant="info"
        onClick={(event) => handleEditClick(event, p)}
      >
        Rediger
      </Button>
      <Button
        type="button"
        variant="danger"
        onClick={() => handleDeleteClick(p.id)}
      >
        Slett
      </Button>
    </>
  );
}

export default ReadOnlyPostComment;
