import { useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PostsComment from "../comments/PostsComment";

const loadedPosts = JSON.parse(localStorage.getItem("posts")) || [];

function PostsDetails() {
  const { title, id } = useParams();

  const [posts] = useState(loadedPosts);
  const post = posts.find((p) => p.id === id);

  return (
    <Container className="postDetail">
      <h1>{title}</h1>
      {post && (
        <div key={post.id}>
          <p className="message">{post.message}</p>
          <h6 className="author">Forfatter</h6>
          <p className="author__name">{post.author}</p>
          <hr />
        </div>
      )}
      <PostsComment key={id} id={id} />
    </Container>
  );
}

export default PostsDetails;
