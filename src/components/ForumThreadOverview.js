import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return state;
}

class ForumThreadOverview extends Component {
  render() {

    const user = this.props.user.userName;

    console.log(user);

    return (
      <div className="page-content" id="ForumThreadOverview">
        <h1>Forum Threads</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ForumThreadOverview);