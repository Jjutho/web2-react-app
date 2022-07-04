import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/Sidebar.scss';

const mapStateToProps = state => {
  return state;
}

class Sidebar extends Component {
  render() {

    const user = this.props.user;
    let toggle = false;
    if ( user != null && user.isAdministrator ) {
      toggle = true;
    }

    return (
      <Nav className="sidebar">
        <LinkContainer to="/" id="OpenPrivatePageButton">
          <Nav.Link>Dashboard</Nav.Link>
        </LinkContainer>
        {toggle && <LinkContainer to="/userManagement" id="OpenUserManagementButton">
          <Nav.Link>User Management</Nav.Link>
        </LinkContainer>}
      </Nav>
    );
  }
}

export default connect(mapStateToProps)(Sidebar);