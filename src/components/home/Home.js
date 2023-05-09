import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Button, Col, Figure, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import Footer from "../footer/Footer";

function Home() {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/post/get").then((response) => {
      setPosts(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/media")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  function getPosts() {
    const allPosts = [];
    for (let index = 0; index < posts.length; index++) {
      const postIndex = posts[index];

      if (index >= 3) {
        break;
      } else {
        allPosts.push(
          <Col key={index} className="home__posts--col">
            <Card>
              <Card.Title>{postIndex.title}</Card.Title>
              <Card.Text>{postIndex.message}</Card.Text>
              <Card.Footer>
                {postIndex.author},{" "}
                {new Date().getFullYear() +
                  "/" +
                  new Date().getMonth() +
                  "/" +
                  new Date().getDate()}
              </Card.Footer>
              <Link to={`../posts/${postIndex.title}/${postIndex.id}`}>
                <Button>Les mer</Button>
              </Link>
            </Card>
          </Col>
        );
      }
    }
    return allPosts;
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  function showImages() {
    const allImages = [];
    for (let i = 0; i < data.length; i++) {
      if (i >= 5) {
        break;
      } else {
        allImages.push(
          <Figure key={i}>
            <Figure.Image
              variant="top"
              src={"http://localhost:3001/images/" + data[i].image}
              style={{
                width: 400,
                margin: "auto",
                marginTop: 10,
                height: "auto",
              }}
            />
          </Figure>
        );
      }
    }
    return allImages;
  }

  return (
    <>
      <Container className="home">
        <h1 className="home__header">Velkommen til Lunden</h1>
        <p className="home__text">Her blir det mye spill, lek og moro</p>
        <p className="home__text--second">
          Klikk for å delta på årets begivenhet
        </p>
        <Link to="../participate" className="home__cta">
          <Button>Delta</Button>
        </Link>
      </Container>
      <Container className="home__intro">
        <h1>Velkommen til Lunden</h1>
        <p>
          Hvert år, hver pinse, tar vi turen til Lunden leir- og fritidssenter
        </p>
        <p>
          Her blir det mye lek og moro. Vi holder også samling for å snakke Guds
          ord
        </p>
        <p>Alle som vil kan delta. Dette vil bli forykende moro</p>
      </Container>
      <Container className="home__posts">
        <h3>Nyeste Innlegg</h3>
        <Row className="md-3 lg-4">{getPosts()}</Row>
      </Container>
      <hr />
      <Container className="home__qoute">
        <h4>
          <i>Glede i hjertet gir god helse, mismot tærer på marg og bein.</i>
        </h4>
      </Container>
      <hr />
      <Container className="home__carousel">
        <h3>Utvalgte bilder</h3>
        <Carousel
          centerMode={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={100}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {showImages()}
        </Carousel>
      </Container>
      <Container>
        <Footer />
      </Container>
    </>
  );
}

export default Home;
