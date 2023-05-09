import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import EditPostComment from "./EditPostComment";
import ReadOnlyPostComment from "./ReadOnlyPostComment";

function PostComment({ id }) {
  const [comments, setComments] = useState([]);
  const [editCommentsId, setEditCommentsId] = useState(null);
  const [show, setShow] = useState(false);

  const [addFormData, setAddFormData] = useState({
    comment: "",
    name: "",
  });

  const [editFormData, setEditFormData] = useState({
    comment: "",
    name: "",
  });

  /* const { watch, setValue } = useForm({
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
  ); */

  useEffect(() => {
    //localStorage.setItem("foodTable", JSON.stringify(comments));
    axios
      .get("http://localhost:3001/comments/get")
      .then((response) => setComments(response.data));
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
    //event.preventDefault();

    const newPost = {
      comment: addFormData.comment,
      name: addFormData.name,
    };

    axios.post("http://localhost:3001/comments/insert", newPost);
    const newcomments = [...comments, newPost];
    setComments(newcomments);
    setShow(false);
  };

  const handleEditFormSubmit = (event) => {
    //event.preventDefault();

    const editedPost = {
      id: editCommentsId,
      comment: editFormData.comment,
      name: editFormData.name,
    };

    axios.put(`http://localhost:3001/comments/update`, editedPost);
    const newcomments = [...comments];
    const index = comments.findIndex((ing) => ing.id === editCommentsId);
    newcomments[index] = editedPost;

    setComments(newcomments);
    setEditCommentsId(null);
    setShow(false);
  };

  const handleEditClick = (event, p) => {
    //event.preventDefault();
    setEditCommentsId(p.id);

    const FormValues = {
      comment: p.comment,
      name: p.name,
    };

    setEditFormData(FormValues);
  };

  const handleCancelClick = () => {
    setEditCommentsId(null);
  };

  const handleDeleteClick = (commentsId) => {
    const newcomments = [...comments];
    const index = comments.findIndex((p) => p.id === commentsId);

    newcomments.splice(index, 1);
    axios.delete(`http://localhost:3001/comments/delete/${commentsId}`);
    setComments(newcomments);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Skriv ny kommentar
      </Button>
      <Form onSubmit={handleEditFormSubmit} className="mt-5">
        <Card>
          {comments.map((p, i) =>
            editCommentsId === p.id ? (
              <EditPostComment
                key={p.id}
                handleEditFormSubmit={handleEditFormSubmit}
                editFormData={editFormData}
                handleEditFormChange={handleEditFormChange}
                handleCancelClick={handleCancelClick}
              />
            ) : (
              <ReadOnlyPostComment
                key={p.id}
                p={p}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
            )
          )}
        </Card>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Skriv ny kommentar</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleAddFormSubmit}>
            <Form.Control
              type="text"
              required
              name="comment"
              onChange={handleAddFormChange}
              autoFocus
            />
            <Form.Control
              type="text"
              name="name"
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

export default PostComment;
