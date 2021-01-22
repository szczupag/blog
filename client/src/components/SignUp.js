import { useState, useContext } from "react";
import { Form, Button, Container } from 'react-bootstrap';
import { useMutation, gql } from '@apollo/client';
import FormErrors from './FormErrors';
import { AuthContext } from './AuthContext';

const SignUp = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [signUp] = useMutation(signUpQuery, {
    update(_, { data: { register: userData } }) {
      context.signIn(userData);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      registerInput: values
    },
  });

  const onSignUp = (e) => {
    e.preventDefault();
    signUp();
  }

  return (
    <Container>
      <Form onSubmit={onSignUp}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={values.username}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={values.confirmPassword}
            onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
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

const signUpQuery = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput){
      id
      email
      token
      username
    }
  }
`;

export default SignUp;
