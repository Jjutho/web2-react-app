import React, { Component } from 'react';
import TopMenu from './components/TopMenu';
import PublicPage from './components/PublicPage';
import PrivatePage from './components/PrivatePage';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return state;
}

class App extends Component{
  render() {

    const user = this.props.user;

    let page;

    if (user) {
      page = <PrivatePage />;
    } else {
      page = <PublicPage />;
    }

    return (
      <div className="App">
        <TopMenu />
        {page}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
