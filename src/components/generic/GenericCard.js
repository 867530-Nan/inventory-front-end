import Card from "react-bootstrap/Card";

function GenericCard({ title, body, imageUrl }) {
  return (
    <Card style={{ width: "14rem" }} bg="#P5P5P4">
      {imageUrl && <Card.Img variant="top" src={imageUrl} />}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default GenericCard;
