import { Card } from 'react-bootstrap';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const Post = ({ post: { title, body, author, createdAt, id } }) => {
  const history = useHistory();
  return (
    <Card style={{ cursor: "pointer" }} onClick={() => history.push(`/post/${id}`)}>
      <Card.Header>{author}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body.substring(0, 80)}{body.length > 100 && "..."}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{moment(createdAt).fromNow()}</small>
      </Card.Footer>
    </Card>
  )
};

export default Post;
