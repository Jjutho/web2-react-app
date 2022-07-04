import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';

const mapStateToProps = state => {
  return state;
}

class PrivatePage extends Component {
  render() {
    return (
      <div className="page-content" id="PrivatePage" style={{background: 'white'}}>
        <Sidebar/>
        <h1>Private Page</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PrivatePage);