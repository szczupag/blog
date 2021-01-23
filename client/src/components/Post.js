import { useState, useEffect, useContext } from 'react';
import { Card, Spinner, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { AuthContext } from './AuthContext';
import moment from 'moment';
import DeleteButton from './DeleteButton';
import EditPost from './EditPost';

const Post = () => {
  const [edit, setEdit] = useState(false);
  const { user } = useContext(AuthContext);
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const { loading, data } = useQuery(fetchPostQuery, { variables: { postId } });

  useEffect(() => {
    if (data) {
      setPost(data.getPost);
    }
  }, [data]);

  if (edit) {
    return <EditPost post={post} />
  }
  return (
    <>
      {loading ? (
        <div className="spinnerWrapper">
          <Spinner animation="grow" />
        </div>
      ) :
        <Container>
          <Card>
            <Card.Header>
              {post.author}
              <br />
              <small className="text-muted">{moment(post.createdAt).fromNow()}</small>
            </Card.Header>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
            </Card.Body>
            {user.username === post.author && (
              <Card.Footer>
                <Button
                  variant="secondary"
                  style={{ marginRight: '16px' }}
                  onClick={() => setEdit(true)}
                >Edit</Button>
                <DeleteButton postId={postId} />
              </Card.Footer>
            )}
          </Card>
        </Container>
      }
    </>
  )
};

const fetchPostQuery = gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      title
      body
      author
      createdAt
    }
  }
`;

export default Post;
export {
  fetchPostQuery,
}
