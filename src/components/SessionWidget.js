import React, { Component } from 'react';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import '../styles/SessionWidget.scss';

import * as authenticationActions from '../actions/authenticationActions';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return state;
};

class SessionWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID : '',
      password : '',
    };
    this.handleShowLoginDialog = this.handleShowLoginDialog.bind(this);
    this.handleHideLoginDialog = this.handleHideLoginDialog.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
  }

  handleShowLoginDialog() {
    const { showLoginDialogAction } = this.props;
    showLoginDialogAction();
  }
  
  handleHideLoginDialog() {
    const { hideLoginDialogAction } = this.props;
    hideLoginDialogAction();
  }

  handleOnChange(e) {
    const { name, value } = e.target;
    this.setState({ [name] : value });
  }

  handleSubmit (e) {
    e.preventDefault();
    const { userID, password } = this.state;
    const { authenticateUserAction } = this.props;
    authenticateUserAction(userID, password);
  }

  handleLogout () {
    const { logoutUserAction } = this.props;
    logoutUserAction();
  }

  canSubmit() {
    const { userID, password } = this.state;
    if (userID && password) {
      return true;
    } else {
      return false;
    }
  }

  render() {

    let showDialog = this.props.showLoginDialog;
    if ( showDialog === undefined ) {
      showDialog = false;
    }

    let loginPending = this.props.loginPending;
    if ( loginPending === undefined ) {
      loginPending = false;
    }

    let isError = this.props.error;
    if ( isError === undefined ) {
      isError = false;
    }

    const user = this.props.user;
    
    let sessionButton;

    if (user) {
      const userName = user.userName;
      sessionButton = <span className="user_greeting"><span className="greeting">Hallo {userName}!</span><Button id="LogoutButton" variant="secondary" onClick={this.handleLogout}>Logout</Button></span>;
    } else {
      sessionButton = <Button variant="primary" onClick={this.handleShowLoginDialog}>Login</Button>;
    }
    
    let submitButton;
    if (this.canSubmit()) {
      submitButton = <Button id="LoginButton" variant="primary" type="submit" onClick={this.handleSubmit}>Login</Button>;
    } else {
      submitButton = <Button id="LoginButton" variant="primary" type="submit" disabled>Login</Button>;
    }

    return (
      <div>
        {sessionButton}
        <Modal show={showDialog} onHide={this.handleHideLoginDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="LoginUserIDInput">
                <Form.Label>User ID</Form.Label>
                <Form.Control type="text" placeholder="User ID" name="userID" onChange={this.handleOnChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="LoginPasswordInput">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleOnChange} />
              </Form.Group>
              {submitButton}
              {isError && <Form.Label style={{color: "red", marginLeft:"20px"}}>Invalid user ID or password</Form.Label>}
              {loginPending && <Spinner animation="border" variant="primary" style={{marginLeft:"20px"}} />}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            Passwort vergessen?
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators ({
  showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
  hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
  authenticateUserAction: authenticationActions.authenticateUser,
  logoutUserAction: authenticationActions.getLogoutAction
}, dispatch);

const ConnectedSessionWidget = connect(mapStateToProps, mapDispatchToProps)(SessionWidget);

export default ConnectedSessionWidget;