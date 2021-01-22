import { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { AuthContext } from './AuthContext';

const Header = () => {
  const { user, signOut } = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>Blog</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {user ? (
        <>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">{user.username}</a>
            </Navbar.Text>
            <Nav>
              <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      ) : (
        <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link href="/sign-in">Sign In</Nav.Link>
              <Nav.Link href="/sign-up">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
    </Navbar>
  );
}

export default Header;
