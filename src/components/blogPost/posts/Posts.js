import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const loadedPosts = JSON.parse(localStorage.getItem("posts")) || [];

function Posts() {
  const [posts] = useState(loadedPosts);

  return (
    <>
      <Container fluid className="post__title">
        <h1>Innlegg</h1>
      </Container>
      <Container className="post">
        <Link to={`../postform`} className="post__navigate">
          <Button variant="primary" className="post__navigate--btn">
            Administrer innlegg
          </Button>
        </Link>
        {posts.map((p, i) => {
          return (
            <Link key={i} to={`${p.title}/${p.id}`} className="post__cards">
              <Card>
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
                    (new Date().getMonth() + 1) +
                    "/" +
                    new Date().getDate()}
                </Card.Footer>
                <Button>Les mer</Button>
              </Card>
            </Link>
          );
        })}
      </Container>
    </>
  );
}

export default Posts;
