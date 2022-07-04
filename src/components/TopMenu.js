import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import ConnectedSessionWidget from './SessionWidget';
import { LinkContainer } from 'react-router-bootstrap';

class TopMenu extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Web2-Frontend</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
            </Nav>
            <ConnectedSessionWidget />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default TopMenu;