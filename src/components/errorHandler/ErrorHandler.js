import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

function ErrorHandler() {
  return (
    <Container>
      <Card className="pageError">
        <Card.Title as="h2" className="pageError__container--title">
          Oooopppppsss!!
        </Card.Title>
        <Card.Text className="pageError__container--text">
          Looks like something went wrong here
        </Card.Text>
        <Card.Text className="pageError__container--text">
          Please try refresh the page
        </Card.Text>
      </Card>
    </Container>
  );
}

export default ErrorHandler;
