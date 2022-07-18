import React, { Component } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ConnectedSessionWidget from '../utils/SessionWidget';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

const mapStateToProps = state => {
  return state;
}

class TopMenu extends Component {
  render() {

    const user = this.props.user;

    return (
      <Navbar bg="dark" expand="lg" variant="dark" className={`${ user ? 'private-nav' : 'public-nav' }`}>
        <Container>
          <Nav>
            <LinkContainer to="/">
              <Nav.Link>
                <div className="brand">
                  <FontAwesomeIcon icon={faLeaf} size='2x' color='#4E9F3D'/>
                  <h2 className="website-title">EcoNet</h2>
                </div>
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <ConnectedSessionWidget />
        </Container>
      </Navbar>
    )
  }
}

export default connect(mapStateToProps)(TopMenu);