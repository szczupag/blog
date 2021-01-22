import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Errors = ({errors}) => (
  <ListGroup>
    {Object.values(errors).map(val =>
      <ListGroupItem style={{
        color: '#721c24',
        backgroundColor: '#f5c6cb',
        marginBottom: '16px'
      }} key={val}>{val}</ListGroupItem>
    )}
  </ListGroup>
);

export default Errors;
