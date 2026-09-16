import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Media() {
  function years() {
    const yArr = [];
    const currentYear = new Date().getFullYear();

    for (let i = 2020; i <= currentYear; i++) {
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
