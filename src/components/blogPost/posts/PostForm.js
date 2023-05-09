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
  Table,
} from "react-bootstrap";

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
      .get("http://localhost:3001/post/get")
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

    axios.post("http://localhost:3001/post/insert", newPost);
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

    axios.put(`http://localhost:3001/post/update`, editedPost);
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
    axios.delete(`http://localhost:3001/post/delete/${postId}`);
    setPosts(newposts);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {" "}
        Skriv ny melding{" "}
      </Button>
      <Form onSubmit={handleEditFormSubmit} className="mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Forfatter</th>
              <th>Tittel</th>
              <th>Melding</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p, i) => (
              <>
                {editPostId === p.id ? (
                  <EditPostRow
                    key={p.id}
                    handleEditFormSubmit={handleEditFormSubmit}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyPostRow
                    key={p.id}
                    p={p}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </>
            ))}
          </tbody>
        </Table>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Skriv ny melding</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleAddFormSubmit}>
            <Form.Control
              type="text"
              required
              name="author"
              onChange={handleAddFormChange}
              autoFocus
            />
            <Form.Control
              type="text"
              name="title"
              onChange={handleAddFormChange}
            />
            <Form.Control
              type="text"
              name="message"
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
    </>
  );
}

export default PostForm;
