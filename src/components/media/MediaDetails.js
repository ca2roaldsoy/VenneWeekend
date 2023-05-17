import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Container, Form, FormControl, Image } from "react-bootstrap";
import Loading from "./Loading";
import ErrorHandler from "../errorHandler/ErrorHandler";

export function MediaDetails() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorHandle, setErrorHandle] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3001/media/", {
        params: {
          id: id,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setFiles(response.data);
        } else {
          setErrorHandle(true);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const setimgfile = (event) => {
    setFiles(event.target.files);
  };

  const addUserData = (event) => {
    event.preventDefault();
    var formData = new FormData();

    for (const file of files) {
      formData.append("files", file);
    }
    formData.append("year", id);

    axios
      .post(`http://localhost:3001/media/`, formData)
      .then((window.location.href = `../media/${id}`));
  };

  const fileList = files ? [...files] : [];

  const deleteFile = (fileId) => {
    const newFiles = [...files];
    const index = files.findIndex((file) => file.id === fileId);

    newFiles.splice(index, 1);
    axios.delete(`http://localhost:3001/media/delete/${fileId}`);
    setFiles(newFiles);
  };

  if (loading) {
    return <Loading />;
  }

  return errorHandle ? (
    <ErrorHandler />
  ) : (
    <Container className="mediaDetails">
      <h1>Media for {id}</h1>
      <Form>
        <h4>Upload file:</h4>
        <FormControl type="file" name="photo" onChange={setimgfile} multiple />
        <Button variant="success" type="submit" onClick={addUserData}>
          Submit
        </Button>
      </Form>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gridGap: "15px",
          listStyleType: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {fileList.map((file, i) =>
          file.year === id ? (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <li
                style={{
                  position: "relative",
                  paddingTop: "100%",
                  marginBottom: "0px",
                  marginTop: "40px",
                }}
              >
                <Image
                  src={"http://localhost:3001/images/" + file.image}
                  alt={file.name}
                  style={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "100%",
                    width: "auto",
                  }}
                />
              </li>
              <Button
                variant="danger"
                onClick={() => deleteFile(file.id)}
                style={{
                  marginTop: "25px",
                  width: "50%",
                  alignSelf: "center",
                }}
              >
                Slett
              </Button>
            </div>
          ) : null
        )}
      </ul>
    </Container>
  );
}
export default MediaDetails;
