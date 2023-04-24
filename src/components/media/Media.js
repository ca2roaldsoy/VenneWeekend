import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button } from 'react-bootstrap';

export function Media() {
      const [file, setFile] = useState();
      const [fileName, setFileName] = useState("");
      const [data, setData] = useState([])
 
      const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };

      
      useEffect(() => {
        axios.get("http://localhost:3001/media")
      .then(res =>  setData(res.data))
      .catch(err => console.log(err))
    }, [])
 
      const uploadFile = () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        axios.post("http://localhost:3001/media", formData).then(window.location.href = "/media")
      };

    const deleteFile = (id) => {
     const newData = [...data];
      const index = data.findIndex((d) => d.id === id);

      console.log(data);

      newData.splice(index, 1);
      axios.delete(`http://localhost:3001/media/delete/${id}`)
      setData(newData);
    }

      return (
        <div>
            <input type="file" onChange={saveFile} />
            <Button onClick={() => uploadFile()}>Upload</Button>
            {data.map((d, index) => (
              <div key={index} className="pb-3">
               <img src={"http://localhost:3001/images/"+d.image} alt="" />
               <Button onClick={() => deleteFile(d.id)}>delete</Button>
            </div>
           ))}
        </div>
      );

}
export default Media