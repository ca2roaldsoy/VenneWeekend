import React from "react";
import { Button, Card } from "react-bootstrap";

function ReadOnlyPostComment({ p, handleEditClick, handleDeleteClick }) {
  return (
    <>
      <Card.Body>{p.comments}</Card.Body>
      <Card.Footer className="text-muted">
        <i>{p.name}</i>
      </Card.Footer>
    </>
  );
}

export default ReadOnlyPostComment;
