import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import StopSign from "../../images/stop.png";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

// if user has no permission to site
function Permission() {
  return (
    <Container>
      <Card className="pageError">
        <Card.Img
          src={StopSign}
          alt="man denying access, with forbidden sign on him"
          role="image"
          className="pageError__img"
        />
        <Card.ImgOverlay className="pageError__container">
          <Card.Title as="h2">
            <b>Access Denied</b>
          </Card.Title>
        </Card.ImgOverlay>
        <Card.Title className="pageError__container--title">
          Sorry, You don't have permission to view this page.
        </Card.Title>
        <Card.Text className="pageError__container--text">
          <b>Please log in through admin to gain access to this page</b>
          <br />
          --- or ---
        </Card.Text>
        <Card.Text className="pageError__container--text">
          <Link to="/">
            <Button>Go to home page</Button>
          </Link>
        </Card.Text>
      </Card>
    </Container>
  );
}

export default Permission;
