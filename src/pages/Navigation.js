import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="apple-navigation">
      <Container>
        <Navbar/>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/iphone" className="apple-nav-link" style={{ color: 'black' }} >iPhone</Nav.Link>
            <Nav.Link href="/tv" className="apple-nav-link" style={{ color: 'black' }} >TV &amp; Mac</Nav.Link>
            <Nav.Link href="/mombaca" className="apple-nav-link" style={{ color: 'black' }} >Mombaça</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
