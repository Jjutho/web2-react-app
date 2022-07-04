import React, { Component } from 'react';
import TopMenu from './components/TopMenu';
import PublicPage from './components/PublicPage';
import PrivatePage from './components/PrivatePage';
import UserManagement from './components/UserManagement';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return state;
}

class App extends Component{
  render() {

    const user = this.props.user;

    let isAdmin = false;
    if ( user != null && user.isAdministrator ) {
      isAdmin = true;
    }

    return (
      <div className="App">
        <Router>
          <TopMenu />
            { user 
              ? <Routes> 
                  <Route exact path="/" element={<PrivatePage />}/>
                  {isAdmin 
                    && <Route path="/userManagement" element={<UserManagement/>}/>
                  } 
                </Routes>
              : <Routes> 
                  <Route exact path="/" element={<PublicPage />}/> 
                </Routes>
            }
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
