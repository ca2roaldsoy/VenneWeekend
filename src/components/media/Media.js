import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImageGroup, Image } from "react-fullscreen-image";

export function Media() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/media/")
      .then((res) => {
        setFiles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const setimgfile = (e) => {
    setFiles(e.target.files);
  };

  const addUserData = (event) => {
    event.preventDefault();
    var formData = new FormData();

    for (const file of files) {
      formData.append("files", file);
    }

    const res = axios
      .post("http://localhost:3001/media", formData)
      .then((window.location.href = "./media"));

    if (res.data.status === 201) {
      console.log("NO error");
    } else {
      console.log("error");
    }
  };

  const fileList = files ? [...files] : [];

  /* const deleteFile = (id) => {
     const newData = [...data];
      const index = data.findIndex((d) => d.id === id);

      console.log(data);

      newData.splice(index, 1);
      axios.delete(`http://localhost:3001/media/delete/${id}`)
      setData(newData);
    } */

  return (
    <>
      <div style={{ padding: 15, backgroundColor: "#fff", marginTop: 15 }}>
        <h4>Upload file:</h4>
        <input type="file" name="photo" onChange={setimgfile} multiple />
        <button type="submit" onClick={addUserData}>
          submit
        </button>
      </div>
      <ImageGroup>
        <ul
          className="images"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gridGap: "15px",
            listStyleType: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {fileList.map((file, i) => (
            <li key={i} style={{ position: "relative", paddingTop: "66%" }}>
              <Image
                key={file.id}
                src={"http://localhost:3001/images/" + file.image}
                alt={file.name}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </li>
          ))}
        </ul>
      </ImageGroup>
    </>
  );
}
export default Media;
