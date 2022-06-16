import React, { Component } from 'react';
import LoginButton from './LoginButton';

class PublicPage extends Component {
  render() {
    return (
      <div className="page-content" id="LandingPage" style={{background: 'white'}}>
        <h1>Willkommen</h1>
        <LoginButton />
      </div>
    );
  }
}

export default PublicPage;