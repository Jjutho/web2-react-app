import React, { Component } from 'react';
import '../../styles/ForumMessageCard.scss';

import { Button, Modal, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as forumMessageActions from '../../actions/forumMessageActions';

const mapStateToProps = state => {
  return state;
}

class UserCard extends Component {
  
  constructor (props) {
    super(props);
    this.handleShowEditDialog = this.handleShowEditDialog.bind(this);
    this.handleShowDeleteDialog = this.handleShowDeleteDialog.bind(this);
    this.handleCloseDeleteDialog = this.handleCloseDeleteDialog.bind(this);
  }

  async handleShowEditDialog(selectedForumMessage) {
    const { showEditDialogAction, getSelectedForumMessageAction } = this.props;
    await getSelectedForumMessageAction(selectedForumMessage);
    showEditDialogAction();
  }

  handleShowDeleteDialog() {
    const { showDeleteDialogAction } = this.props;
    showDeleteDialogAction();
  }

  handleCloseDeleteDialog() {
    const { closeDeleteDialogAction } = this.props;
    closeDeleteDialogAction();
  }

  async handleDelete(e, messageID, threadID) {
    e.preventDefault();
    const { deleteForumMessage } = this.props;
    let token = this.props.accessToken;
    await deleteForumMessage(messageID, threadID, token);
    this.handleCloseDeleteDialog();
  }

  render() {

    const user = this.props.user;

    let threadID = this.props.thread;
    let messageID = this.props.messageID;
    let title = this.props.title;
    let text = this.props.text;
    let authorID = this.props.authorID;

    let selectedForumMessage = {
      title: title,
      text: text,
      _id: messageID,
      forumThreadID: threadID,
      authorID: authorID
    }

    const id = "ForumMessage" + messageID;
    const buttonID = "EditForumMessageButton" + messageID;
    const deleteButtonID = "DeleteForumMessageButton" + messageID;

    let mayEdit = false;
    if (user.userID === authorID || user.isAdministrator) {
      mayEdit = true;
    }

    let showDeleteDialog = this.props.showDeleteDialog;
    if ( showDeleteDialog === undefined ){
      showDeleteDialog = false;
    }  

    return (
      <div className="forum-message-card forumThread" id={id}>
        <div className="forum-message-info">
          <div className="forum-message-card-name"><span className="highlighted-text"><h3>{title}</h3></span></div>
          <div className="forum-message-card-author">by <span className="highlighted-text-light">{authorID}</span></div>
          <div className="forum-message-card-description"><p>{text}</p></div>
        </div>
        { mayEdit &&
          <div className="forum-message-buttons">
            <Button id={buttonID} variant="primary" className="tertiary" onClick={() => this.handleShowEditDialog(selectedForumMessage)}>Edit</Button>
            <Button id={deleteButtonID} variant="secondary" onClick={() => this.handleShowDeleteDialog()}>Delete</Button>
          </div>
        }
        <Modal show={showDeleteDialog} onHide={this.handleCloseDeleteDialog}>
        <Modal.Header>
          <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={this.handleCloseDeleteDialog}></button>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="f-right button-container">
              <Button className="abort-button" id="DeleteForumMessageCancel" variant="secondary" onClick={this.handleCloseDeleteDialog}>Abort</Button>
              <Button className="delete-button" id="DeleteForumMessageConfirm" variant="primary" type="submit" onClick={e => this.handleDelete(e, messageID, threadID)}>Confirm</Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators ({
  showEditDialogAction: forumMessageActions.getShowForumMessageEditDialogAction,
  getSelectedForumMessageAction: forumMessageActions.getSelectedForumMessageAction,
  showDeleteDialogAction: forumMessageActions.getShowDeleteDialogAction,
  closeDeleteDialogAction: forumMessageActions.getCloseDeleteDialogAction,
  deleteForumMessage: forumMessageActions.deleteForumMessage,
  getForumMessages: forumMessageActions.getForumMessages,
}, dispatch);

const ConnectedUserCard = connect(mapStateToProps, mapDispatchToProps)(UserCard);

export default ConnectedUserCard;