import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import {
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { Table, Tbody, Th, Thead, Tr } from "react-super-responsive-table";
import * as yup from "yup";
import EditPostRow from "./EditPostRow";
import ReadOnlyPostRow from "./ReadOnlyPostRow";

// validate input field
const schema = yup.object().shape({
  author: yup.string().required("Dette feltet må fylles"),
  message: yup.string(),
});
const loadedPosts = JSON.parse(localStorage.getItem("posts")) || [];

function PostForm() {
  const [posts, setPosts] = useState(loadedPosts);
  const [editPostId, setEditPostId] = useState(null);
  const [show, setShow] = useState(false);

  const [addFormData, setAddFormData] = useState({
    author: "",
    title: "",
    message: "",
  });

  const [editFormData, setEditFormData] = useState({
    author: "",
    title: "",
    message: "",
  });

  const { watch, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  useFormPersist(
    "post",
    {
      watch,
      setValue,
    },
    {
      storage: window.localStorage,
    }
  );

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
    /* axios
      .get(axiosURL + "post/get")
      .then((response) => setPosts(response.data)); */
  }, [posts]);

  const handleAddFormChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      id: nanoid(),
      author: addFormData.author,
      title: addFormData.title,
      message: addFormData.message,
    };

    //axios.post(axiosURL + "post/insert", newPost);
    const newposts = [...posts, newPost];
    localStorage.setItem("posts", JSON.stringify(newposts));
    setPosts(newposts);
    setAddFormData({ author: "", title: "", message: "" });
    setShow(false);
  };

  const handleEditFormSubmit = (event) => {
    const editedPost = {
      id: editPostId,
      author: editFormData.author,
      title: editFormData.title,
      message: editFormData.message,
    };

    //axios.put(axiosURL + `post/update`, editedPost);
    const newposts = [...posts];
    const index = posts.findIndex((ing) => ing.id === editPostId);
    newposts[index] = editedPost;

    setPosts(newposts);
    setEditPostId(null);
  };

  const handleEditClick = (event, p) => {
    event.preventDefault();
    setEditPostId(p.id);

    const FormValues = {
      author: p.author,
      title: p.title,
      message: p.message,
    };

    setEditFormData(FormValues);
  };

  const handleCancelClick = () => {
    setEditPostId(null);
  };

  const handleDeleteClick = (postId) => {
    const newposts = posts.filter((post) => post.id !== postId);

    /*  axios.delete(axiosURL + `post/delete/${postId}`); */
    setPosts(newposts);
    localStorage.setItem("posts", JSON.stringify(newposts));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="admPost">
      <h1>Administrer innlegg</h1>
      <Button variant="primary" onClick={handleShow} className="addNew">
        + Skriv ny melding
      </Button>
      <Form onSubmit={handleEditFormSubmit}>
        <Table>
          <Thead>
            <Tr>
              <Th>Forfatter</Th>
              <Th>Tittel</Th>
              <Th>Melding</Th>
              <Th>#</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.map((p, i) =>
              editPostId === p.id ? (
                <EditPostRow
                  key={i}
                  handleEditFormSubmit={handleEditFormSubmit}
                  editFormData={editFormData}
                  handleEditFormChange={handleEditFormChange}
                  handleCancelClick={handleCancelClick}
                />
              ) : (
                <ReadOnlyPostRow
                  key={i}
                  p={p}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              )
            )}
          </Tbody>
        </Table>
      </Form>

      <Modal show={show} onHide={handleClose} className="admModal">
        <ModalHeader closeButton>
          <ModalTitle>Skriv ny melding</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleAddFormSubmit}>
            <Form.Label>Forfatter</Form.Label>
            <Form.Control
              type="text"
              name="author"
              onChange={handleAddFormChange}
              autoFocus
            />
            <Form.Label>Tittel</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={handleAddFormChange}
            />
            <Form.Label>Melding</Form.Label>
            <Form.Control
              type="text"
              name="message"
              as="textarea"
              onChange={handleAddFormChange}
            />
            <ModalFooter>
              <Button type="submit" variant="success">
                Lagre
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default PostForm;
