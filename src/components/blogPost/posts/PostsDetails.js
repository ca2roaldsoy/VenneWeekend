import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostsComment from "../comments/PostsComment";

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
    <>
      <h1>{title}</h1>
      {posts.map((p) => {
        const numId = parseInt(id);
        if (p.id === numId) {
          return (
            <p key={p.id}>
              {p.message}
              {p.author}
            </p>
          );
        }
      })}
      <PostsComment key={id} id={id} />
    </>
  );
}

export default PostsDetails;
