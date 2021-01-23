import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { fetchPostsQuery } from './Home'


const DeleteButton = ({ postId }) => {
  const history = useHistory();
  const [deletePost] = useMutation(deletePostMutation, {
    update(proxy) {
      const data = proxy.readQuery({
        query: fetchPostsQuery
      });
      proxy.writeQuery({
        query: fetchPostsQuery,
        data: { getPosts: data.getPosts.filter(el => el.id !== postId) }
      });
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