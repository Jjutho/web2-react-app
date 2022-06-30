import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return state;
};

class UserManagement extends Component {
  render() {
    return (
      <div className="page-content" id="LandingPage" style={{background: 'white'}}>
        <h1>User Management</h1>
        
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
  };
}

const ConnectedUserManagement = connect(mapStateToProps, mapDispatchToProps)(UserManagement);

export default ConnectedUserManagement;