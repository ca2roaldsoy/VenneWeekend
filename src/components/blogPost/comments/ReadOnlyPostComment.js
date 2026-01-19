import { Card } from "react-bootstrap";

function ReadOnlyPostComment({ p, handleEditClick, handleDeleteClick }) {
  return (
    <>
      <Card.Body>{p.comment}</Card.Body>
      <Card.Footer className="text-muted">
        <i>{p.name}</i>
      </Card.Footer>
    </>
  );
}

export default ReadOnlyPostComment;
