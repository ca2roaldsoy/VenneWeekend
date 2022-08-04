import React from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Carousel from 'react-bootstrap/Carousel';

function Home() {

return (
    <>
    <Container>
    <Carousel fade nextLabel="false" prevLabel="false" indicators="false">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src=""
          alt="Lunden"
        />
        <Carousel.Caption>
          <h3>VenneWeekend</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src=""
          alt="Lunden"
        />

        <Carousel.Caption>
          <h3>VenneWeekend</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src=""
          alt="Lunden"
        />

        <Carousel.Caption>
          <h3>VenneWeekend</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </Container>
        <Row className="md-3 lg-4">
            <Container>
            <section className="home__box">
                <Image className="home__box--image" />
                <p className="home__box--text">Meny</p>
            </section>
            </Container>
            <Container>
            <section className="home__box">
                <Image className="home__box--image" />
                <p className="home__box--text">Media</p>
            </section>
            </Container>
            <Container>
            <section className="home__box">
                <Image className="home__box--image" />
                <p className="home__box--text">Innlegg</p>
            </section>
            </Container>
        </Row>
    </>
);
}

export default Home;