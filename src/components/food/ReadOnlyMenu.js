import React from "react";
import { Button, Card } from "react-bootstrap";

function ReadOnlyMenu({ menu, handleEditClick, handleDeleteClick }) {
  return (
    <>
      <Card.Header>Fredag</Card.Header>
      <Card.Body>
        <Card.Title>{menu.friday}</Card.Title>
      </Card.Body>
      <Card.Header>Lørdag</Card.Header>
      <Card.Body>
        <Card.Title>{menu.saturday}</Card.Title>
      </Card.Body>
      <Card.Header>Søndag</Card.Header>
      <Card.Body>
        <Card.Title>{menu.sunday}</Card.Title>
      </Card.Body>
      <Card.Footer className="menu__actionBtns">
        <Button
          type="button"
          variant="info"
          onClick={(event) => handleEditClick(event, menu)}
        >
          Rediger
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={() => handleDeleteClick(menu.id)}
        >
          Slett
        </Button>
      </Card.Footer>
    </>
  );
}

export default ReadOnlyMenu;
