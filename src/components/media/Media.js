import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Media() {
  function years() {
    const yArr = [];

    for (let i = 2020; i < 2023; i++) {
      yArr.push(
        <Col md={4} sm={1} key={i}>
          <Link to={`${i}`}>
            <Card>
              <Card.Title>{i}</Card.Title>
            </Card>
          </Link>
        </Col>
      );
    }

    return yArr;
  }

  return (
    <>
      <Container fluid className="media__title">
        <h1>Media</h1>
      </Container>
      <Container className="mediaLibrary">
        <Row>{years()}</Row>
      </Container>
    </>
  );
}

export default Media;
