import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostsComment from "../comments/PostsComment";
import { Container } from "react-bootstrap";

function PostsDetails() {
  const { title, id } = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/post/get/", {
        params: {
          id: id,
        },
      })
      .then((response) => {
        setPosts(response.data);
      });
  }, []);

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
