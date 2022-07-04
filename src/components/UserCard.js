import React, { Component } from 'react';
import '../styles/UserCard.scss';

import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as editUserActions from '../actions/editUserActions';

const mapStateToProps = state => {
  return state;
}

class UserCard extends Component {
  
  constructor (props) {
    super(props);
    this.handleShowEditDialog = this.handleShowEditDialog.bind(this);
  }

  async handleShowEditDialog(selectedUser) {
    const { showEditDialogAction, getSelectedUserAction } = this.props;
    await getSelectedUserAction(selectedUser);
    showEditDialogAction();
  }

  render() {

    let userID = this.props.userID;
    let userName = this.props.userName || 'No username';
    let isAdmin = this.props.isAdministrator || false;
    let password = this.props.password;

    let selectedUser = {
      userID: userID,
      userName: userName,
      isAdministrator: isAdmin,
      password: password
    }

    return (
      <div className="user-card">
        <div className="user-card-info">
          <div className="user-card-name">{userID}</div>
          <div className="user-card-email">{userName}</div>
          {isAdmin && <div className="user-card-admin">Administrator</div>}
          <Button variant="primary" onClick={() => this.handleShowEditDialog(selectedUser)}>Edit User</Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators ({
  showEditDialogAction: editUserActions.getShowEditDialogAction,
  getSelectedUserAction: editUserActions.getSelectedUserAction,
}, dispatch);

const ConnectedUserCard = connect(mapStateToProps, mapDispatchToProps)(UserCard);

export default ConnectedUserCard;