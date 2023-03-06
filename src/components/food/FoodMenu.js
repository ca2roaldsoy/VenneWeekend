import React from "react";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import { Button } from "react-bootstrap";

function FoodMenu() {
    function addedMenu() {
        if (JSON.parse(localStorage.getItem("foodMenu")).length > 0) {
            return (
                <Card>
            <Card.Body>
                <Card.Subtitle>Oppskrift</Card.Subtitle>
                <ListGroup className="list-group-flush">
            <ListGroup.Item></ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
            </Card.Body>
          </Card>
            )
        } else {
            return (
                <Card.Title><Button href="/create-menu" >Add a menu</Button></Card.Title>
            )
        }
    }

return (
    <Accordion defaultActiveKey="0" alwaysOpen>
    <Accordion.Item eventKey="0">
      <Accordion.Header>2023</Accordion.Header>
      <Accordion.Body>
    <CardGroup>
        <Card.Header>Fredag</Card.Header>
        {addedMenu()}
    </CardGroup>
    </Accordion.Body>
    </Accordion.Item>
    </Accordion>
)
}

export default FoodMenu;