import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PostsComment from "../comments/PostsComment";

function PostsDetails() {
  const { title, id } = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    localStorage.setItem("post", JSON.stringify(posts));
  }, [posts]);

  return (
    <Container className="postDetail">
      <h1>{title}</h1>
      {posts.map((p) => {
        const numId = parseInt(id);
        if (p.id === numId) {
          return (
            <div key={p.id}>
              <p className="message">{p.message}</p>
              <h6 className="author">Forfatter</h6>
              <p className="author__name">{p.author}</p>
              <hr />
            </div>
          );
        }
      })}
      <PostsComment key={id} id={id} />
    </Container>
  );
}

export default PostsDetails;
