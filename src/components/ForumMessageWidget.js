import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as forumMessageActions from '../actions/forumMessageActions';
import ForumMessageCard from './ForumMessageCard';

const mapStateToProps = state => {
  return state;
}

class ForumMessageWidget extends Component {
  constructor(props) {
    super(props);
    this.handleFetch = this.handleFetch.bind(this);
    this.mapThreadsToComponents = this.mapThreadsToComponents.bind(this);
  }

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch() {
    const { getForumMessageAction, thread } = this.props;
    getForumMessageAction(thread);
  }

  mapThreadsToComponents(messages) {
    return messages.map(message => {
      return <ForumMessageCard key={message._id} messageID={message._id} threadID={message.forumThreadID} title={message.title} text={message.text} authorID={message.authorID}/>
    });
  };

  render() {    

    let updateForumMessageSuccess = this.props.updateForumMessageSuccess;
    if ( updateForumMessageSuccess === undefined ) {
      updateForumMessageSuccess = false;
    }
    
    let foundForumMessages = false;
    let messages = this.props.messages;
    let forumMessageComponent;
    if (messages !== undefined && messages.length !== 0) {
      foundForumMessages = true;
      forumMessageComponent = this.mapThreadsToComponents(messages);
    }

    return (
      <div className="forum-message-overview-widget" id="ForumMessageList">
        {(updateForumMessageSuccess || foundForumMessages) 
          ? forumMessageComponent
          : <div><h3>No forum messages found</h3></div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators ({
  getForumMessageAction: forumMessageActions.getForumMessages,
  getUpdateForumMessageSuccessAction: forumMessageActions.getUpdateForumMessageSuccessAction
}, dispatch);

const ConnectedForumMessageWidget = connect(mapStateToProps, mapDispatchToProps)(ForumMessageWidget);

export default ConnectedForumMessageWidget;