import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const DeleteButton = ({ postId,  }) => {
  const history = useHistory();
  const [deletePost] = useMutation(deletePostMutation, {
    update() {
      history.push('/');
    },
    variables: {
      postId
    }
  });

  return (
    <Button
      variant="danger"
      onClick={deletePost}
    >
      Delete
    </Button>
  );
}

const deletePostMutation = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;