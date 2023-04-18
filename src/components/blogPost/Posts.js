import axios from "axios";
import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";


function Posts () {
    const [posts, setPosts] = useState([])

    const [newPost, setNewPost] = useState("");

    useEffect(() => {
     axios.get("http://localhost:3001/post/get").then((response) => setPosts(response.data));
      }, [posts]);

      const deletePost = (blogTitle) => {
        axios.delete(`http://localhost:3001/post/delete/${blogTitle}`)
      }

      const updatePost = (blogTitle) => {
        axios.put(`http://localhost:3001/post/update`, {author: posts.userName, title: blogTitle, message: newPost})
        setNewPost("")
      }
    
      

    return (
        <>
        <h1>Hello</h1>
        {posts.map(p => {
            return( 
            <> 
            <h1>Author: {p.author} {p.title} {p.message}</h1> 
            <Button onClick={() => (deletePost(p.title))}>Delete</Button> 
            <input type="text" id="updateInput" onChange={(e) => {
              setNewPost(e.target.value)
            }} /> 
            <Button onClick={() => (updatePost(p.title))}>Update</Button>
            </>
            )
          })}
        </>
    )
}

export default Posts