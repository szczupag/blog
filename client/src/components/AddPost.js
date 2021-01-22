import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button, Container } from 'react-bootstrap';
import FormErrors from './FormErrors';
import { fetchPostsQuery } from './Home';

const AddPost = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    title: '',
    body: '',
  });

  const [addPost] = useMutation(addPostQuery, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: fetchPostsQuery
      });
      const new_post = result.data.createPost;
      proxy.writeQuery({
        query: fetchPostsQuery,
        data: { getPosts: [new_post, ...data.getPosts] }
      });
      setValues({
        title: '',
        body: '',
      });
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

  return (
    <Container>
      <div className="formWrapper">
        <h1>Add post</h1>
        <Form onSubmit={onAddPost}>
          <Form.Group controlId="title">
            <Form.Control
              type="text"
              placeholder="Title"
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="body">
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
      </div>
    </Container>
  )
}

const addPostQuery = gql`
  mutation CreatePost($body: String!, $title: String!){
    createPost(body: $body, title: $title){
      id
      title
      body
      author
      createdAt
    }
  }
`;

export default AddPost;
