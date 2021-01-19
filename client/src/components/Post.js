import { Card } from 'react-bootstrap';

const Post = ({ post: { title, body, author, createdAt } }) => (
  <Card>
    <Card.Header>{author}</Card.Header>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{body}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{createdAt}</small>
    </Card.Footer>
  </Card>
);

export default Post;