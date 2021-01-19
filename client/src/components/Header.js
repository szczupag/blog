import { Navbar, Nav } from 'react-bootstrap';

const Header = ({ loggedIn }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>Blog</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {loggedIn ? (
        <>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/add-post">Add post</Nav.Link>
              <Nav.Link href="/contact-us">Contact us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">username</a>
            </Navbar.Text>
            <Nav>
              <Nav.Link href="/sign-out">Sign out</Nav.Link>
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
