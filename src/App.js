import React, { Component } from 'react';
import TopMenu from './components/Navigation/TopMenu';
import PublicPage from './components/SinglePages/PublicPage';
import PrivatePage from './components/SinglePages/PrivatePage';
import UserManagement from './components/UserManagement/UserManagement';
import ForumThreadOverview from './components/ForumThread/ForumThreadOverview';
import ForumThread from './components/ForumMessage/ForumThread';
import Sidebar from './components/Navigation/Sidebar';
import './styles/General.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProtectedRoutes from './components/utils/ProtectedRoute';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return state;
}

class App extends Component{
  render() {

    const user = this.props.user;

    return (
      <div className="App">
        <Router>
          <TopMenu />
          <div className={`page-content-top ${ user ? 'private' : 'public' }`}>
          { user ? <Sidebar/> : null }
            <Routes>
              { user 
                ? <Route exact path="/" element={<PrivatePage />}/>
                : <Route exact path="/" element={<PublicPage />}/> 
              }
              <Route exact path="/" 
                element={
                  <ProtectedRoutes user={user}>
                    <PrivatePage />
                  </ProtectedRoutes>
                }
              />
              <Route path="/userManagement" 
                element={
                  <ProtectedRoutes user={user} adminOnly={true}>
                    <UserManagement />
                  </ProtectedRoutes>
                }
              />
              <Route path="/forumThreadOverview" 
                element={
                  <ProtectedRoutes user={user}>
                    <ForumThreadOverview />
                  </ProtectedRoutes>
                }
              />
              <Route path="/forumThread/:id" 
                element={
                  <ProtectedRoutes user={user}>
                    <ForumThread />
                  </ProtectedRoutes>
                }
              />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
