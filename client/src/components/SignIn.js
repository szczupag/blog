import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button, Container } from 'react-bootstrap';
import FormErrors from './FormErrors';

const SignIn = (props) => {
  const [errors, setErrors] = useState({});
  const [username, setUsernameValue] = useState('');
  const [password, setPasswordValue] = useState('');

  const [signIn] = useMutation(signInQuery, {
    update(_, result) {
      console.log(result);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      username,
      password
    }
  });

  const onSignIn = (e) => {
    e.preventDefault();
    signIn();
  };

  return (
    <Container>
      <Form onSubmit={onSignIn}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsernameValue(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPasswordValue(e.target.value)}
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

const signInQuery = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password){
      token
    }
  }
`;

export default SignIn;
