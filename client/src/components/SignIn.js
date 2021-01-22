import { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useMutation, gql } from '@apollo/client';
import { Form, Button, Container } from 'react-bootstrap';
import FormErrors from './FormErrors';

const SignIn = () => {
  const [errors, setErrors] = useState({});
  const [username, setUsernameValue] = useState('');
  const [password, setPasswordValue] = useState('');
  const { authenticated, setUsername, setAuthenticated } = useContext(AuthContext);

  const [signIn] = useMutation(signInQuery, {
    update(proxy, result) {
      console.log(result);
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

  if (authenticated) return <Redirect to="/" />
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
