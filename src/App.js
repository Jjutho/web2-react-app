import React, { Component } from 'react';
import TopMenu from './components/TopMenu';
import WorkspacePublic from './components/WorkspacePublic';
import LoginButton from './components/LoginButton';

class App extends Component{
  render() {
    return (
      <div className="App">
        <LoginButton />
        <TopMenu />
        <WorkspacePublic>
          <LoginButton />
        </WorkspacePublic>
      </div>
    );
  }
}

export default App;
