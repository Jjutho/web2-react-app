import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import '../../styles/Sidebar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

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
          <Nav.Link>
          <FontAwesomeIcon icon={faHouse} size='2x' color='#fff'/>
          </Nav.Link>
        </LinkContainer>
        {toggle && <LinkContainer to="/userManagement" id="OpenUserManagementButton">
          <Nav.Link>
            <FontAwesomeIcon icon={faUsers} size='2x' color='#fff'/>
          </Nav.Link>
        </LinkContainer>}
        <LinkContainer to="/forumThreadOverview" id="OpenForumThreadOverviewButton">
          <Nav.Link>
            <FontAwesomeIcon icon={faListUl} size='2x' color='#fff'/>
          </Nav.Link>
        </LinkContainer>
      </Nav>
    );
  }
}

export default connect(mapStateToProps)(Sidebar);