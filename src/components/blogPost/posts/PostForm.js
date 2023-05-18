import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../../../context/AdminContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { blogPosts } from "../../../constants/blogPosts";
import useFormPersist from "react-hook-form-persist";
import axios from "axios";
import EditPostRow from "./EditPostRow";
import ReadOnlyPostRow from "./ReadOnlyPostRow";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Container,
} from "react-bootstrap";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import { axiosURL } from "../../../constants/axiosURL";

// validate input field
const schema = yup.object().shape({
  author: yup.string().required("Dette feltet må fylles"),
  message: yup.string(),
});

function PostForm() {
  const [posts, setPosts] = useState([]);
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
    //localStorage.setItem("foodTable", JSON.stringify(posts));
    axios
      .get(axiosURL + "post/get")
      .then((response) => setPosts(response.data));
  }, []);

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
    const newPost = {
      author: addFormData.author,
      title: addFormData.title,
      message: addFormData.message,
    };

    axios.post(axiosURL + "post/insert", newPost);
    const newposts = [...posts, newPost];
    setPosts(newposts);
  };

  const handleEditFormSubmit = (event) => {
    //event.preventDefault();

    const editedPost = {
      id: editPostId,
      author: editFormData.author,
      title: editFormData.title,
      message: editFormData.message,
    };

    axios.put(axiosURL + `post/update`, editedPost);
    const newposts = [...posts];
    const index = posts.findIndex((ing) => ing.id === editPostId);
    newposts[index] = editedPost;

    setPosts(newposts);
    setEditPostId(null);
  };

  const handleEditClick = (event, p) => {
    //event.preventDefault();
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
    const newposts = [...posts];
    const index = posts.findIndex((p) => p.id === postId);

    newposts.splice(index, 1);
    axios.delete(axiosURL + `post/delete/${postId}`);
    setPosts(newposts);
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
