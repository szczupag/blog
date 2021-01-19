import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Container, Spinner, CardColumns } from 'react-bootstrap';
import Post from './Post';

const Home = () => {
  const { loading, data } = useQuery(fetchPostsQuery);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data && data.getPosts) setPosts(data.getPosts);
  }, [loading]);

  return (
    <Container>
      {loading ? (
        <div className="spinnerWrapper">
          <Spinner animation="grow" />
        </div>
      ) : (
          <CardColumns>
            {posts.map(post => <Post key={post.id} post={post} />)}
          </CardColumns>
        )}
    </Container>
  )
}

const fetchPostsQuery = gql`
  query {
    getPosts {
      id
      title
      body
      createdAt
      author
    }
  }
`;

export default Home;
