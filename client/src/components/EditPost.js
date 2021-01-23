import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button, Container } from 'react-bootstrap';
import FormErrors from './FormErrors';
import { useHistory } from 'react-router-dom';
import { fetchPostsQuery } from './Home'

const EditPost = ({ post: { title, body, id } }) => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [newBody, setBody] = useState(body);

  const [updatePost] = useMutation(editPostQuery, {
    update(proxy) {
      const data = proxy.readQuery({
        query: fetchPostsQuery
      });
      const rest = data.getPosts.filter(el => el.id !== id);
      const updated = data.getPosts.find(el => el.id === id);
      const newUpdated = {
        ...updated,
        body: newBody,
      };
      proxy.writeQuery({
        query: fetchPostsQuery,
        data: { getPosts: [newUpdated, ...rest] }
      });
      history.push('/');
    },
    onError(err) {
      console.log(err)
      setErrors([err.graphQLErrors[0].message]);
    },
    variables: {
      body: newBody,
      postId: id
    }
  });

  const onEditPost = (e) => {
    e.preventDefault();
    updatePost();
  };

  return (
    <Container>
      <div className="formWrapper">
        <h1>Edit post</h1>
        <Form onSubmit={onEditPost}>
          <Form.Group controlId="title">
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="body">
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Body"
              value={newBody}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </Form.Group>
          <FormErrors errors={errors} />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  )
}

const editPostQuery = gql`
  mutation EditPost($postId: ID!, $body: String!){
    updatePost(postId: $postId, body: $body)
  }
`;

export default EditPost;
