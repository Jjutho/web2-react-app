import React, { Component } from 'react';
import '../styles/ForumThreadCard.scss';

import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as forumThreadActions from '../actions/forumThreadActions';

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

  async handleShowEditDialog(selectedForumThread) {
    const { showEditDialogAction, getSelectedForumThreadAction } = this.props;
    await getSelectedForumThreadAction(selectedForumThread);
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

  async handleDelete(e, threadID) {
    e.preventDefault();
    const { deleteForumThread } = this.props;
    let token = this.props.accessToken;
    await deleteForumThread(threadID, token);
    this.handleCloseDeleteDialog();
  }

  render() {

    let threadID = this.props.threadID;
    let name = this.props.name;
    let description = this.props.description;

    let selectedForumThread = {
      threadID: threadID,
      name: name,
      description: description
    }

    const id = "ForumThread" + threadID;
    const buttonID = "EditForumThreadButton" + threadID;
    const deleteButtonID = "DeleteForumThreadButton" + threadID;

    let showDeleteDialog = this.props.showDeleteDialog;
    if ( showDeleteDialog === undefined ){
      showDeleteDialog = false;
    }  

    return (
      <div className="forum-thread-card forumThread" id={id}>
        <div className="forum-thread-info">
          <div className="user-card-name user-card-table"><span className="highlighted-text">Title: </span>{name}</div>
          <div className="user-card-email user-card-table"><span className="highlighted-text">Description: </span>{description}</div>
        </div>
        <div className="forum-thread-buttons">
          <Button id={buttonID} variant="primary" onClick={() => this.handleShowEditDialog(selectedForumThread)}>Edit forum thread</Button>
          <Button id={deleteButtonID} variant="secondary" onClick={() => this.handleShowDeleteDialog()}>Delete forum thread</Button>
        </div>
        <Modal show={showDeleteDialog} onHide={this.handleCloseDeleteDialog}>
        <Modal.Header>
          <button type="button" class="btn-close btn-close-white" aria-label="Close" onClick={this.handleCloseDeleteDialog}></button>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="f-right button-container">
              <Button className="abort-button" id="DeleteForumThreadCancel" variant="secondary" onClick={this.handleCloseDeleteDialog}>Abort</Button>
              <Button className="delete-button" id="DeleteForumThreadConfirm" variant="primary" type="submit" onClick={e => this.handleDelete(e, threadID)}>Confirm</Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators ({
  showEditDialogAction: forumThreadActions.getShowEditDialogAction,
  getSelectedForumThreadAction: forumThreadActions.getSelectedForumThreadAction,
  showDeleteDialogAction: forumThreadActions.getShowDeleteDialogAction,
  closeDeleteDialogAction: forumThreadActions.getCloseDeleteDialogAction,
  deleteForumThread: forumThreadActions.deleteForumThread,
  getForumThreads: forumThreadActions.getForumThreads,
}, dispatch);

const ConnectedUserCard = connect(mapStateToProps, mapDispatchToProps)(UserCard);

export default ConnectedUserCard;