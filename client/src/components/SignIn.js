import { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useMutation, gql } from '@apollo/client';
import { Form, Button, Container } from 'react-bootstrap';

const SignIn = () => {
  const [username, setUsernameValue] = useState('');
  const [password, setPasswordValue] = useState('');
  const [signIn] = useMutation(signInQuery);
  const { authenticated, setUsername, setAuthenticated } = useContext(AuthContext);
  const onSignIn = (e) => {
    e.preventDefault();
    signIn({ variables: { username, password } })
      .then(() => {
        setUsername(username);
        setAuthenticated(true);
      })
      .catch(error => {
        error.graphQLErrors.map(({ message }) => alert(message))
      })
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
      id
    }
  }
`;

export default SignIn;
