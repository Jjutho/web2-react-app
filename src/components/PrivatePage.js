import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return state;
}

class PrivatePage extends Component {
  render() {

    const user = this.props.user;

    let userManagementButton;

    if (user.isAdministrator) {
      userManagementButton = <LinkContainer to="/userManagement" id="OpenUserManagementButton"><Button>User Management</Button></LinkContainer>
      ;
    } else {
      userManagementButton = <div id="OpenUserManagementButton"></div>;
    }

    return (
      <div className="page-content" id="PrivatePage" style={{background: 'white'}}>
        <h1>Private Page</h1>
        {userManagementButton}
      </div>
    );
  }
}

export default connect(mapStateToProps)(PrivatePage);