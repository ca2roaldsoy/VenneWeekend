import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Button, Col, Figure, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import Footer from "../footer/Footer";
import { axiosURL } from "../../constants/axiosURL";

function Home() {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(axiosURL + "post/get").then((response) => {
      setPosts(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(axiosURL + "media")
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
          <Col lg={4} md={6} sm={12} key={index} className="home__posts--col">
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
    lg: {
      breakpoint: { max: 4000, min: 992 },
      items: 3,
      slidesToSlide: 1,
    },
    md: {
      breakpoint: { max: 992, min: 576 },
      items: 2,
      slidesToSlide: 1,
    },
    sm: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
      slidesToSlide: 1,
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
              src={axiosURL + "images/" + data[i].image}
              style={{
                width: "100%",
                height: 400,
                margin: "auto",
                marginTop: 10,
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
          <Button>Påmelding</Button>
        </Link>
      </Container>
      <Container className="home__intro">
        <h1>Velkommen til Leir</h1>
        <p>
          Hvert år, hver pinse, tar vi turen til Lunden leir- og fritidssenter
        </p>
        <p>
          Her blir det mye lek og moro. Vi holder også samling for å snakke Guds
          ord
        </p>
        <p>
          14 km fra Hauge sentrum i Sokndal kommune, ligger Lunden leir- og
          fritidssenter. Leiren ligger vakkert til ved Årrestadvannet omringet
          av storslått natur for rekreasjon og fritidsaktiviteter.
        </p>
        <p>Alle som vil kan melde seg på. Dette vil bli forykende moro</p>
      </Container>
      <hr />
      <Container className="home__qoute">
        <h4>
          <i>Glede i hjertet gir god helse, mismot tærer på marg og bein.</i>
        </h4>
      </Container>
      <hr />
      <Container fluid className="home__posts">
        <h2>Innlegg</h2>
        <Row className="md-3 lg-4">{getPosts()}</Row>
      </Container>
      <hr />
      <Container className="home__carousel">
        <h3>Utvalgte bilder</h3>
        <Carousel
          responsive={responsive}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={100}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-0-px"
        >
          {showImages()}
        </Carousel>
      </Container>
      <Container fluid>
        <Footer />
      </Container>
    </>
  );
}

export default Home;
