import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return state;
}

class PrivatePage extends Component {
  render() {

    const user = this.props.user.userName;

    return (
      <div className="page-content" id="PrivatePage">
        <h1>Welcome {user}!</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PrivatePage);