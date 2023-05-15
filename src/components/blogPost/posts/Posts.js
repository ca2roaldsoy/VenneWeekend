import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/post/get").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <Container className="post">
      <h1>Innlegg</h1>
      <Link to={`../postform`} className="post__navigate">
        <Button variant="primary" className="post__navigate--btn">
          Administrer innlegg
        </Button>
      </Link>
      {posts.map((p, i) => {
        console.log(p);
        return (
          <Link to={`${p.title}/${p.id}`} className="post__cards">
            <Card key={i}>
              <Card.Title>{p.title}</Card.Title>
              <Card.Text>
                {p.message.length > 20
                  ? p.message.slice(0, 20) + "..."
                  : p.message}
              </Card.Text>
              <Card.Footer>
                {p.author}, {""}
                {new Date().getFullYear() +
                  "/" +
                  new Date().getMonth() +
                  "/" +
                  new Date().getDate()}
              </Card.Footer>
              <Button>Les mer</Button>
            </Card>
          </Link>
        );
      })}
    </Container>
  );
}

export default Posts;
