import axios from "axios";
import React, {useState, useEffect} from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Posts () {
    const [posts, setPosts] = useState([])

    useEffect(() => {
     axios.get("http://localhost:3001/post/get").then((response) =>{setPosts(response.data)});
      }, []);

    return (
        <>
          <h1>Innlegg</h1>
            {posts.map((p, i) => {
                return( 
                <Card key={i}> 
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text>{p.message}</Card.Text>
                  <Card.Footer>{p.author}, {new Date().getFullYear()+"/"+new Date().getMonth()+"/"+new Date().getDate()}</Card.Footer>
                  <Link to={`${p.title}/${p.id}`}><Button>Les mer</Button></Link>
                </Card>
                )
              })}
        </>
    )
}

export default Posts