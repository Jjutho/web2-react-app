import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as editUserActions from '../actions/editUserActions';
import UserCard from './UserCard';

const mapStateToProps = state => {
  return state;
}

class UserManagementWidget extends Component {
  constructor(props) {
    super(props);
    this.handleFetch = this.handleFetch.bind(this);
    this.mapUsersToComponents = this.mapUsersToComponents.bind(this);
  }

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch() {
    const { getUsersAction } = this.props;
    getUsersAction();
  }

  mapUsersToComponents(users) {
    return users.map(user => {
      return <UserCard key={user.userID} userID={user.userID} userName={user.userName} isAdministrator={user.isAdministrator} password={user.password} />
    });
  };

  render() {

    let getUsersPending = this.props.getUsersPending;
    if ( getUsersPending === undefined ) {
      getUsersPending = false;
    }

    let updateUserSuccess = this.props.updateUserSuccess;
    if ( updateUserSuccess === undefined ) {
      updateUserSuccess = false;
    }
    
    let foundUsers = false;
    let users = this.props.users;
    let usersComponent;
    if (users !== undefined && users.length !== 0) {
      foundUsers = true;
      usersComponent = this.mapUsersToComponents(users);
    }

    return (
      <div className="user-management-widget">
        {/* {getUsersPending && <Spinner animation="border" variant="primary" style={{marginLeft:"20px"}} />} */}
        {(updateUserSuccess || foundUsers) 
          ? usersComponent
          : <div><h3>No users found</h3></div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators ({
  getUsersAction: editUserActions.getUsers,
  getUpdateUserSuccessAction: editUserActions.getUpdateUserSuccessAction
}, dispatch);

const ConnectedUserManagementWidget = connect(mapStateToProps, mapDispatchToProps)(UserManagementWidget);

export default ConnectedUserManagementWidget;