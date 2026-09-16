import { nanoid } from "nanoid";
import { useState } from "react";
import { Button, Container, Form, FormControl, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ErrorHandler from "../errorHandler/ErrorHandler";
import Loading from "./Loading";

const loadedFiles = JSON.parse(localStorage.getItem("images")) || [];

const readAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export function MediaDetails() {
  const [files, setFiles] = useState(loadedFiles);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [loading] = useState(false);
  const [errorHandle] = useState(false);

  const { id } = useParams();

  const setimgfile = (event) => {
    setPendingFiles([...event.target.files]);
  };

  const addUserData = async (event) => {
    event.preventDefault();

    if (pendingFiles.length === 0) return;

    const newFiles = await Promise.all(
      pendingFiles.map(async (file) => ({
        id: nanoid(),
        year: id,
        name: file.name,
        image: await readAsDataUrl(file),
      }))
    );

    const updatedFiles = [...files, ...newFiles];
    localStorage.setItem("images", JSON.stringify(updatedFiles));
    setFiles(updatedFiles);
    setPendingFiles([]);
    event.target.reset();
  };

  const deleteFile = (fileId) => {
    const newFiles = files.filter((file) => file.id !== fileId);

    //axios.delete(axiosURL + `media/delete/${fileId}`);
    localStorage.setItem("images", JSON.stringify(newFiles));
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
      <Form onSubmit={addUserData}>
        <h4>Last opp bilde:</h4>
        <FormControl type="file" name="photo" onChange={setimgfile} multiple />
        <Button variant="success" type="submit">
          Last opp
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
        {files.map((file) =>
          file.year === id ? (
            <div
              key={file.id}
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
                  src={file.image}
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
