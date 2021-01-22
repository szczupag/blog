import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Form, Button, Container } from 'react-bootstrap';
import FormErrors from './FormErrors';

const AddPost = () => {
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    title: '',
    body: '',
  });

  const [addPost] = useMutation(addPostQuery, {
    update() {
      setSuccess(true);
    },
    onError(err) {
      setErrors([err.graphQLErrors[0].message]);
    },
    variables: values
  });

  const onAddPost = (e) => {
    e.preventDefault();
    addPost();
  };

  if (success) return <Redirect to="/" />

  return (
    <Container>
      <Form onSubmit={onAddPost}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="body">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Body"
            value={values.body}
            onChange={(e) => setValues({ ...values, body: e.target.value })}
            required
          />
        </Form.Group>
        <FormErrors errors={errors} />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

const addPostQuery = gql`
  mutation CreatePost($body: String!, $title: String!){
    createPost(body: $body, title: $title){
      id
      title
      body
      createdAt
    }
  }
`;

export default AddPost;
