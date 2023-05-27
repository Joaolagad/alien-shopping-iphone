import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const HeaderNav = () => {
  return (
    <Navbar expand="lg" className="apple-navigation">
      <Container>
        <Navbar.Brand className='apple-store-principal'>
          <span className="apple-store-title">
            Store. 
          </span>
          <span className='apple-store-2title'>
            The best way to buy the products you love.
          </span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default HeaderNav;
