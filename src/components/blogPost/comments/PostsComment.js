import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import * as yup from "yup";
import EditPostComment from "./EditPostComment";
import ReadOnlyPostComment from "./ReadOnlyPostComment";

const schema = yup.object().shape({
  author: yup.string().required("Dette feltet må fylles"),
  comment: yup.string(),
});
const loadedComments = JSON.parse(localStorage.getItem("comments")) || [];

function PostComment({ id }) {
  const [comments, setComments] = useState(loadedComments);
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

  const { watch, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  useFormPersist(
    "comments",
    {
      watch,
      setValue,
    },
    {
      storage: window.localStorage,
    }
  );

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
    /*  axios
      .get(axiosURL + "comments/get")
      .then((response) => setComments(response.data)); */
  }, [comments]);

  const handleAddFormChange = (event) => {
    const { name, value } = event.target;
    setAddFormData({ ...addFormData, [name]: value });
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

    const newComment = {
      id: nanoid(),
      postId: id,
      comment: addFormData.comment,
      name: addFormData.name,
    };

    //axios.post(axiosURL + "comments/insert", newComment);
    const newComments = [...comments, newComment];
    localStorage.setItem("comments", JSON.stringify(newComments));
    setComments(newComments);
    setAddFormData({ comment: "", name: "" });
    setShow(false);
  };

  const handleEditFormSubmit = (event) => {
    const editedComment = {
      id: editCommentsId,
      postId: id,
      comment: editFormData.comment,
      name: editFormData.name,
    };

    //axios.put(axiosURL + "comments/update", editedComment);
    const newcomments = [...comments];
    const index = comments.findIndex(
      (comment) => comment.id === editCommentsId
    );
    newcomments[index] = editedComment;

    setComments(newcomments);
    setEditCommentsId(null);
  };

  const handleEditClick = (event, p) => {
    event.preventDefault();
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
    const newcomments = comments.filter((comment) => comment.id !== commentsId);

    /*  axios.delete(axiosURL + `comments/delete/${commentsId}`); */
    setComments(newcomments);
    localStorage.setItem("comments", JSON.stringify(newcomments));
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
        {comments
          .filter((p) => p.postId === id)
          .map((p, i) => (
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
