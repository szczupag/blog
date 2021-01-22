import { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import FormErrors from './FormErrors';
import { AuthContext } from './AuthContext';

const SignIn = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [username, setUsernameValue] = useState('');
  const [password, setPasswordValue] = useState('');

  const [signIn] = useMutation(signInQuery, {
    update(_, { data: { login: userData } }) {
      context.signIn(userData);
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
      <Row className="justify-content-md-center">
        <Col lg={8} sm={12}>
          <div className="formWrapper">
            <Form onSubmit={onSignIn}>
              <Form.Group controlId="username">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsernameValue(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password">
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
          </div>
        </Col>
      </Row>
    </Container>
  )
}

const signInQuery = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password){
      id
      email
      token
      username
    }
  }
`;

export default SignIn;
