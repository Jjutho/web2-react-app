import React, { Component } from 'react';
import { Form, Modal, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import UserManagementWidget from './UserManagementWidget';

import { bindActionCreators } from 'redux';
import * as editUserActions from '../actions/editUserActions';

import '../styles/UserManagement.scss'

const mapStateToProps = state => {
  return state;
};

class UserManagement extends Component {

  constructor(props) {
    super(props);
    this.handleCloseEditDialog = this.handleCloseEditDialog.bind(this);
  }

  handleCloseEditDialog() {
    const { closeEditDialogAction } = this.props;
    closeEditDialogAction();
  }
  
  async handleSubmit( e, selectedUser ) {
    e.preventDefault();
    const { updateUserAction, getUsersAction } = this.props;
    let token = this.props.accessToken;
    await updateUserAction(selectedUser, token);
    getUsersAction();
  }

  render() {

    let showEditDialog = this.props.showEditDialog || false;

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

    return (
      <div className="page-content" id="LandingPage" style={{background: 'white'}}>
        <Sidebar/>
        <h1>User Management</h1>
        <UserManagementWidget/>
        <Modal show={showEditDialog} onHide={this.handleCloseEditDialog}>
          <Modal.Header closeButton>
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
                <Form.Check type="switch" label="Administrator" defaultChecked={userLoaded && selectedUser.isAdministrator} onChange={e => selectedUser.isAdministrator = e.target.checked}/>
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators ({
    closeEditDialogAction: editUserActions.getCloseEditDialogAction,
    updateUserAction: editUserActions.getUpdateUserAction,
    getUsersAction: editUserActions.getUsers
  }, dispatch);

const ConnectedUserManagement = connect(mapStateToProps, mapDispatchToProps)(UserManagement);

export default ConnectedUserManagement;