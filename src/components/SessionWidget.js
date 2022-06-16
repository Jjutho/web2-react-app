import React, { Component } from 'react';
import { getShowLoginDialog } from '../actions/authenticationActions';
import { NavDropdown } from 'react-bootstrap';
import LoginButton from './LoginButton';

class SessionWidget extends Component {
  constructor(props) {
    super(props);
    this.handleShowLoginDialog = this.handleShowLoginDialog.bind(this);
    this.hideLoginDialog = this.hideLoginDialog.bind(this);
    this.canLogin = this.canLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleShowLoginDialog() {
    const dispatch = this.props.dispatch;
    dispatch(getShowLoginDialog());
  }
  
  hideLoginDialog() {
    const dispatch = this.props.dispatch;
    dispatch(getHideLoginDialog());
  }

  canLogin() {
    const { username, password } = this.props;
    if (username && password) {
      return true;
    }
    return false;
  }

  handleSubmit() {
    e.preventDefault();
    const { username, password } = this.props;
    const dispatch = this.props.dispatch;
    dispatch(getLogin(username, password));
  }

  handleLogout () {
    const dispatch = this.props.dispatch;
    dispatch(getLogout());
  }

  render() {
    let user = this.props.user;
    let widgetButton;
    if ( user ) {
      const navIcon = user.avatar ? <img src={user.avatar} alt={user.name} /> : <i className="fa fa-user" />;
      widgetButton = 
      <>
        <NavDropdown title={navIcon} id="basic-nav-dropdown">
          <NavDropdown.Item href="*" onClick={this.handleLogout}>Logout</NavDropdown.Item>
        </ NavDropdown>
      </>
    } else {
      widgetButton = <LoginButton />;
    }

    let showDialog = this.props.showLoginDialog;

    let loginButton;
    if (this.canLogin()) {
      loginButton = <Button variant="primary" type="submit" onClick={this.handleSubmit}>Login</Button>;
    } else {
      loginButton = <Button variant="primary" type="submit" disabled>Login</Button>;
    }

    return (
      <div>
        {widgetButton}
        <Modal show={showDialog} onHide={this.hideLoginDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Control id="LoginUserIDInput" type="text" placeholder="User ID" name="userID" onChange={this.handleChange}/>
              <Form.Control id="LoginPasswordInput" type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideLoginDialog}>
              Close
            </Button>
              {loginButton}
              {isError && <Form.Label style={{color: 'red', marginLeft: '20px'}}>Invalid user ID or password</Form.Label>}
              {pending && <Spinner animation="border" variant="primary" style={{marginLeft: '20px'}}/>}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

startAuthentication = () => {
  const {authenticateUser} = this.props;
  const {username, password} = this.state;
  authenticateUser(username, password);
}

const mapStateToProps = (state) => {
  return state.authenticationReducer;
};

const mapDispatchToProps = (dispatch) => bindActionCreators ({
  authenticateUser: authenticationService.authenticateUser
}, dispatch);

const ConnectedSessionWidget = connect(mapStateToProps, mapDispatchToProps)(SessionWidget);

export default ConnectedSessionWidget;