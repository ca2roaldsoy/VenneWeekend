import React, {useState, useEffect} from "react";

function Posts () {
    //const allBlogPosts = JSON.parse(localStorage.getItem("blogPosts"));
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getStorage = JSON.parse(localStorage.getItem("blogPosts"));
        if(getStorage) setPosts(getStorage);
      }, []);

      function viewAllPosts() {
        // if no establishments, display message...
        if (localStorage.getItem("blogPosts") === null) {
          return (
            <tr>
              <td>There are no posts her yet</td>
            </tr>
          );
        } 
        // ...else
        return (
            <h1>{posts.userName}</h1>
        )
      }
      

    return (
        <>
        <h1>Hello</h1>
        {viewAllPosts()}
        </>
    )
}

export default Posts