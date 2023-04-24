import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

function PostsDetails() {

const { title, id, message } = useParams(); 

const [posts, setPosts] = useState([])

useEffect(() => {
     axios.get("http://localhost:3001/post/get/", {
        params: { 
            id: id,

        }
     }).then((response) =>{
       console.log(response.data);
        setPosts(response.data)
    })
}, []);

return (
    <>
        <h1>{title}</h1>
       {posts.map(p => {
        const numId = parseInt(id)
          if(p.id === numId) {
            return (
            <p key={p.id}>
                {p.message}
                {p.author}
            </p>
            )
        }
        })}
    </>
  )
}

export default PostsDetails