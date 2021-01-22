import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Errors = ({ errors }) => (
  <ListGroup style={{
    marginBottom: '16px'
  }}>
    {Object.values(errors).map(val =>
      <ListGroupItem style={{
        color: '#721c24',
        backgroundColor: '#f5c6cb'
      }} key={val}>{val}</ListGroupItem>
    )}
  </ListGroup>
);

export default Errors;
