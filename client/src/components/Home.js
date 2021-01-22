import { useEffect, useState } from 'react';
import { Container, Spinner, CardColumns, Row, Col } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useQuery, gql } from '@apollo/client';
import PostCard from './PostCard';
import AddPost from './AddPost';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(fetchPostsQuery);

  useEffect(() => {
    if (data) {
      setPosts(data.getPosts);
    }
  }, [data]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg={8} sm={12}>
          {user && <AddPost />}
        </Col>
      </Row>
      {loading ? (
        <div className="spinnerWrapper">
          <Spinner animation="grow" />
        </div>
      ) : (
          <CardColumns>
            {posts.map(post => <PostCard key={post.id} post={post} />)}
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
export {
  fetchPostsQuery,
}
