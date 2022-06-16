import React, { Component } from 'react';
import { getShowLoginDialog } from '../actions/authenticationActions';
import Button from 'react-bootstrap/Button';

class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.showLoginDialog = this.showLoginDialog.bind(this);
  }

  showLoginDialog() {
    const dispatch = this.props.dispatch;
    dispatch(getShowLoginDialog());
  }

  render() {
    return (
      <div>
        <Button id="OpenLoginDialogButton" variant="light" onClick={this.showLoginDialog}>Login</Button>
      </div>
    );
  }
}
export default connect()(LoginButton);