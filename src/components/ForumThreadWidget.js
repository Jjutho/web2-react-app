import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as forumThreadActions from '../actions/forumThreadActions';
import ForumThreadCard from './ForumThreadCard';

const mapStateToProps = state => {
  return state;
}

class ForumThreadWidget extends Component {
  constructor(props) {
    super(props);
    this.handleFetch = this.handleFetch.bind(this);
    this.mapThreadsToComponents = this.mapThreadsToComponents.bind(this);
  }

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch() {
    const { getForumThreadAction } = this.props;
    getForumThreadAction();
  }

  mapThreadsToComponents(threads) {
    return threads.map(thread => {
      return <ForumThreadCard key={thread._id} threadID={thread._id} name={thread.name} description={thread.description} ownerID={thread.ownerID}/>
    });
  };

  render() {

    let updateForumThreadSuccess = this.props.updateForumThreadSuccess;
    if ( updateForumThreadSuccess === undefined ) {
      updateForumThreadSuccess = false;
    }
    
    let foundForumThreads = false;
    let threads = this.props.threads;
    let forumThreadComponent;
    if (threads !== undefined && threads.length !== 0) {
      foundForumThreads = true;
      forumThreadComponent = this.mapThreadsToComponents(threads);
    }

    return (
      <div className="forum-thread-overview-widget" id="ForumThreadList">
        {(updateForumThreadSuccess || foundForumThreads) 
          ? forumThreadComponent
          : <div><h3>No forum threads found</h3></div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators ({
  getForumThreadAction: forumThreadActions.getForumThreads,
  getUpdateForumThreadSuccessAction: forumThreadActions.getUpdateForumThreadSuccessAction
}, dispatch);

const ConnectedForumThreadWidget = connect(mapStateToProps, mapDispatchToProps)(ForumThreadWidget);

export default ConnectedForumThreadWidget;