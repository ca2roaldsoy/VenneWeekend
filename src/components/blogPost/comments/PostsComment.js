import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Container,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import EditPostComment from "./EditPostComment";
import ReadOnlyPostComment from "./ReadOnlyPostComment";
import { axiosURL } from "../../../constants/axiosURL";

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
      .get(axiosURL + "comments/get")
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

    const newComment = {
      comment: addFormData.comment,
      name: addFormData.name,
    };

    axios.post(axiosURL + "comments/insert", newComment);
    const newcomments = [...comments, newComment];
    setComments(newcomments);
    setShow(false);
  };

  const handleEditFormSubmit = (event) => {
    //event.preventDefault();

    const editedComment = {
      id: editCommentsId,
      comment: editFormData.comment,
      name: editFormData.name,
    };

    axios.put(axiosURL + "comments/update", editedComment);
    const newcomments = [...comments];
    const index = comments.findIndex((ing) => ing.id === editCommentsId);
    newcomments[index] = editedComment;

    setComments(newcomments);
    setEditCommentsId(null);
    setShow(false);
  };

  const handleEditClick = (event, p) => {
    //event.preventDefault();
    setEditCommentsId(p.id);

    const FormValues = {
      comment: p.comments,
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
    axios.delete(axiosURL + `comments/delete/${commentsId}`);
    setComments(newcomments);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section className="comments">
      <Button variant="primary" onClick={handleShow} className="comments__btn">
        Skriv ny kommentar
      </Button>
      <h3 className="text-center">Kommentarer</h3>
      <Form onSubmit={handleEditFormSubmit} className="mt-5 comments__form">
        {comments.map((p, i) => (
          <div key={i}>
            <div className="comments__actions">
              <Button
                type="button"
                variant="info"
                onClick={(event) => handleEditClick(event, p)}
                className="comments__actions--edit"
              >
                Rediger
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={() => handleDeleteClick(p.id)}
                className="comments__actions--delete"
              >
                Slett
              </Button>
            </div>

            <Card>
              {editCommentsId === p.id ? (
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
              )}
            </Card>
          </div>
        ))}
      </Form>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Skriv ny kommentar</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleAddFormSubmit}>
            <Form.Control
              type="text"
              name="comment"
              as="textarea"
              placeholder="kommentar"
              onChange={handleAddFormChange}
              autoFocus
            />
            <Form.Control
              type="text"
              name="name"
              placeholder="ditt navn"
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
    </section>
  );
}

export default PostComment;
