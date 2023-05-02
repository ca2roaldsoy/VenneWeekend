import React, { useState, useEffect, useRef, forwardRef } from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import LundenImg from "../../images/lunden_img.jpg";
import { Button, Col, Figure, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ImgCarousel from "./ImgCarousel";
import Carousel from "react-multi-carousel";

function Home() {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const elementRef = useRef();

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
          <Col key={index}>
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
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Container>
        <h1>Velkommen til Lunden</h1>
        <p>Her blir det mye spill, lek og moro</p>
        <Link to="../participate">
          <Button>Delta</Button>
        </Link>
      </Container>
      <Container>
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
      <Container>
        <h3>Nyeste Innlegg</h3>
        <Row className="md-3 lg-4">{getPosts()}</Row>
      </Container>
      <Carousel
      centerMode={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={100}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        //itemClass="carousel-item-padding-40-px"
      >
        {data.map((d, index) => (
          <Figure key={index}>
            <Figure.Image
              variant="top"
              src={"http://localhost:3001/images/" + d.image}
              style={{width: 400, margin: "auto", marginTop: 10, height: 400}}
            />
          </Figure>
        ))}
      </Carousel>
    </>
  );
}

export default Home;
