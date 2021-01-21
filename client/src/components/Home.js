import { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Spinner, CardColumns } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';
import { AuthContext } from './AuthContext';
import Post from './Post';

const Home = () => {
  const { loading, data } = useQuery(fetchPostsQuery);
  const [posts, setPosts] = useState([]);
  const { authenticated } = useContext(AuthContext);

  useEffect(() => {
    if (data && data.getPosts) setPosts(data.getPosts);
  }, [data]);

  if (!authenticated) return <Redirect to="/sign-in" />

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
