import React, { Component } from 'react';
import { Form, Modal, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import UserManagementWidget from './UserManagementWidget';

import { bindActionCreators } from 'redux';
import * as editUserActions from '../actions/editUserActions';

import '../styles/UserManagement.scss';

const mapStateToProps = state => {
  return state;
};

class UserManagement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID : '',
      userName: '',
      password : '',
      isAdministrator: false,
    };
    this.handleCloseEditDialog = this.handleCloseEditDialog.bind(this);
    this.handleShowCreateUserDialog = this.handleShowCreateUserDialog.bind(this);
    this.handleCloseCreateUserDialog = this.handleCloseCreateUserDialog.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleCloseEditDialog() {
    const { closeEditDialogAction } = this.props;
    closeEditDialogAction();
  }

  handleShowCreateUserDialog() {
    const { showCreateUserDialogAction } = this.props;
    showCreateUserDialogAction();
  }

  handleCloseCreateUserDialog() {
    const { closeCreateUserDialog } = this.props;
    closeCreateUserDialog();
  }
  
  async handleSubmit( e, selectedUser ) {
    e.preventDefault();
    const { updateUserAction } = this.props;
    let token = this.props.accessToken;
    await updateUserAction(selectedUser, token);
  }

  async handleUserSubmit( e ) {
    e.preventDefault();
    let { userID, userName, password, isAdministrator } = this.state;
    let newUser = {
      userID: userID,
      userName: userName,
      password: password,
      isAdministrator: isAdministrator
    }
    const { createUserAction } = this.props;
    let token = this.props.accessToken;
    await createUserAction(newUser, token);
    this.handleCloseCreateUserDialog();
  }

  handleOnChange(e) {
    const { name, value } = e.target;
    if ( name === 'isAdministrator') {
      this.setState({ [name] : e.target.checked });
      return;
    }
    this.setState({ [name] : value });
  }

  canSubmit() {
    const { userID, userName, password } = this.state;
    if (userID && password && userName) {
      return true;
    } else {
      return false;
    }
  }

  render() {

    let showEditDialog = this.props.showEditDialog;
    if ( showEditDialog === undefined ) {
      showEditDialog = false;
    }

    let showCreateUserDialog = this.props.showCreateUserDialog;
    if ( showCreateUserDialog === undefined ) {
      showCreateUserDialog = false;
    }

    let userLoaded = false;
    let selectedUser = this.props.selectedUser;
    if (selectedUser !== undefined) {
      userLoaded = true;
    }

    let updateUserPending = this.props.updateUserPending;
    if ( updateUserPending === undefined ) {
      updateUserPending = false;
    }

    let isSuccess = this.props.updateUserSuccess;
    if ( isSuccess === undefined ) {
      isSuccess = false;
    }

    let isError = this.props.error;
    if ( isError === undefined ) {
      isError = false;
    }

    let createUserButton;
    if (this.canSubmit()) {
      createUserButton = <Button className="create-user-button" id="CreateUserButton" variant="primary" type="submit" onClick={e => this.handleUserSubmit(e)}>Create user</Button>
    } else {
      createUserButton = <Button className="create-user-button" id="CreateUserButton" variant="primary" type="submit" onClick={e => this.handleUserSubmit(e)} disabled>Create user</Button>
    }

    return (
      <div className="page-content" id="LandingPage">
        <div className="user-management-heading-btn">
          <h1>User Management</h1>
          <Button id="OpenCreateUserDialogButton" onClick={this.handleShowCreateUserDialog}>+ Add user</Button>
        </div>
        <UserManagementWidget/>
        {/* EDIT USER MODAL */}
        <Modal show={showEditDialog} onHide={this.handleCloseEditDialog}>
        <Modal.Header>
          <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={this.handleCloseEditDialog}></button>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="UserIDInput">
                <Form.Label>User ID</Form.Label>
                <Form.Control type="text" value={userLoaded && selectedUser.userID} name="userID" disabled />
              </Form.Group>
              <Form.Group className="mb-3" controlId="UserNameInput">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" defaultValue={userLoaded && selectedUser.userName} name="userName" onChange={e => selectedUser.userName = e.target.value}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="PasswordInput">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" defaultValue={userLoaded && selectedUser.password} name="password" onChange={e => selectedUser.password = e.target.value}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="IsAdministratorInput">
                <Form.Check type="switch" label="Administrator" name="isAdministrator" defaultChecked={userLoaded && selectedUser.isAdministrator} onChange={e => selectedUser.isAdministrator = e.target.checked}/>
              </Form.Group>
              {updateUserPending && <Spinner animation="border" variant="primary" style={{marginLeft:"20px"}} />}
              {isSuccess && <Form.Label className="update-success" style={{color: "green", marginLeft:"20px"}}>User updated.</Form.Label>}
              {isError && <Form.Label className="update-error" style={{color: "red", marginLeft:"20px"}}>Update failed.</Form.Label>}
              <div className="f-right button-container">
                <Button className="abort-button" id="CancelEditUserButton" variant="secondary" onClick={this.handleCloseEditDialog}>Abort</Button>
                <Button className="save-button" id="SaveUserButton" variant="primary" type="submit" onClick={e => this.handleSubmit(e, selectedUser)}>Save changes</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
        {/* CREATE USER MODAL */}
        <Modal show={showCreateUserDialog} onHide={this.handleCloseCreateUserDialog}>
        <Modal.Header>
        <button type="button" class="btn-close btn-close-white" aria-label="Close" onClick={this.handleCloseCreateUserDialog}></button>
            <Modal.Title>Create User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="UserIDInput">
                <Form.Label>User ID</Form.Label>
                <Form.Control type="text" placeholder="UserID" name="userID" onChange={this.handleOnChange}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="UserNameInput">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" name="userName" onChange={this.handleOnChange}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="PasswordInput">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleOnChange}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="IsAdministratorInput">
                <Form.Check type="switch" label="Administrator" name="isAdministrator" onChange={this.handleOnChange}/>
              </Form.Group>
              <div className="f-right button-container">
                <Button className="abort-button" id="CancelCreateUserButton" variant="secondary" onClick={this.handleCloseCreateUserDialog}>Abort</Button>
                {createUserButton}
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators ({
    closeEditDialogAction: editUserActions.getCloseEditDialogAction,
    updateUserAction: editUserActions.getUpdateUserAction,
    showCreateUserDialogAction: editUserActions.getShowCreateUserDialogAction,
    closeCreateUserDialog: editUserActions.getCloseCreateUserDialogAction,
    createUserAction: editUserActions.getCreateUserAction,
  }, dispatch);

const ConnectedUserManagement = connect(mapStateToProps, mapDispatchToProps)(UserManagement);

export default ConnectedUserManagement;