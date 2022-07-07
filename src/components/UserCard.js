import React, { Component } from 'react';
import '../styles/UserCard.scss';

import { Button, Modal } from 'react-bootstrap';
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
    this.handleShowDeleteDialog = this.handleShowDeleteDialog.bind(this);
    this.handleCloseDeleteDialog = this.handleCloseDeleteDialog.bind(this);
  }

  async handleShowEditDialog(selectedUser) {
    const { showEditDialogAction, getSelectedUserAction } = this.props;
    await getSelectedUserAction(selectedUser);
    showEditDialogAction();
  }

  handleShowDeleteDialog() {
    const { showDeleteDialogAction } = this.props;
    showDeleteDialogAction();
  }

  handleCloseDeleteDialog() {
    const { closeDeleteDialogAction } = this.props;
    closeDeleteDialogAction();
  }

  async handleDelete(e, userID) {
    e.preventDefault();
    const { deleteUserAction, getUsersAction } = this.props;
    let token = this.props.accessToken;
    await deleteUserAction(userID, token);
    this.handleCloseDeleteDialog();
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

    const id = "UserItem" + userID;
    const buttonID = "EditButton" + userID;
    const deleteButtonID = "DeleteButton" + userID;

    let showDeleteDialog = this.props.showDeleteDialog;
    if ( showDeleteDialog === undefined ){
      showDeleteDialog = false;
    }  

    return (
      <div className="user-card" id={id}>
        <div className="user-card-info">
          <div className="user-card-name"><span>User ID: </span>{userID}</div>
          <div className="user-card-email"><span>Username: </span>{userName}</div>
          <div className="user-card-admin"><span>Administrator: </span>
            {isAdmin 
              ? "True"
              : "False"
            }
          </div>
        </div>
        <div className="user-card-buttons">
          <Button id={buttonID} variant="primary" onClick={() => this.handleShowEditDialog(selectedUser)}>Edit User</Button>
          <Button id={deleteButtonID} variant="secondary" onClick={() => this.handleShowDeleteDialog()}>Delete User</Button>
        </div>
        <Modal show={showDeleteDialog} onHide={this.handleCloseDeleteDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete this user?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="f-right button-container">
              <Button className="abort-button" id="DeleteUserCancel" variant="secondary" onClick={this.handleCloseDeleteDialog}>Abort</Button>
              <Button className="delete-button" id="DeleteUserConfirm" variant="primary" type="submit" onClick={e => this.handleDelete(e, userID)}>Confirm</Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators ({
  showEditDialogAction: editUserActions.getShowEditDialogAction,
  getSelectedUserAction: editUserActions.getSelectedUserAction,
  showDeleteDialogAction: editUserActions.getShowDeleteDialogAction,
  closeDeleteDialogAction: editUserActions.getCloseDeleteDialogAction,
  deleteUserAction: editUserActions.deleteUser,
  getUsersAction: editUserActions.getUsers,
}, dispatch);

const ConnectedUserCard = connect(mapStateToProps, mapDispatchToProps)(UserCard);

export default ConnectedUserCard;