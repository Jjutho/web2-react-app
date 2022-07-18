import React, { Component } from 'react';
import '../../styles/ForumThreadCard.scss';

import { Button, Modal, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as forumThreadActions from '../../actions/forumThreadActions';
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

  handleThreadTransfer(threadID, name, description) {
    const { handleThreadTransferAction} = this.props;
    handleThreadTransferAction(threadID, name, description);
  }

  async handleDelete(e, threadID) {
    e.preventDefault();
    const { deleteForumThread } = this.props;
    let token = this.props.accessToken;
    await deleteForumThread(threadID, token);
    this.handleCloseDeleteDialog();
  }

  render() {

    const user = this.props.user;

    let threadID = this.props.threadID;
    let name = this.props.name;
    let description = this.props.description;
    let ownerID = this.props.ownerID;

    let selectedForumThread = {
      name: name,
      description: description,
      _id: threadID,
      ownerID: ownerID
    }

    const id = "ForumThread" + threadID;
    const buttonID = "EditForumThreadButton" + threadID;
    const deleteButtonID = "DeleteForumThreadButton" + threadID;
    const viewButtonID = "ViewForumThreadButton" + threadID;

    let mayEdit = false;
    if (user.userID === ownerID || user.isAdministrator) {
      mayEdit = true;
    }

    let showDeleteDialog = this.props.showDeleteDialog;
    if ( showDeleteDialog === undefined ){
      showDeleteDialog = false;
    }  

    return (
      <div className="forum-thread-card forumMessage" id={id}>
        <div className="forum-thread-info">
          <div className="forum-thread-card-name"><span className="highlighted-text"><h2>{name}</h2></span></div>
          <div className="forum-thread-card-author">by <span className="highlighted-text-light">{ownerID}</span></div>
          <div className="forum-thread-card-description"><p>{description}</p></div>
        </div>
        <div className="forum-thread-buttons">
          <LinkContainer to={`/forumThread/${threadID}`}>
            <Nav.Link>
              <Button id={viewButtonID} variant="primary" onClick={() => this.handleThreadTransfer(threadID, name, description)}>View messages</Button>
            </Nav.Link>
          </LinkContainer>
          { mayEdit &&
          <Button id={buttonID} variant="primary" className="tertiary" onClick={() => this.handleShowEditDialog(selectedForumThread)}>Edit</Button>
          }
          { mayEdit &&
          <Button id={deleteButtonID} variant="secondary" onClick={() => this.handleShowDeleteDialog()}>Delete</Button>
          }
        </div>
        <Modal show={showDeleteDialog} onHide={this.handleCloseDeleteDialog}>
        <Modal.Header>
          <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={this.handleCloseDeleteDialog}></button>
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
  showEditDialogAction: forumThreadActions.getShowForumThreadEditDialogAction,
  getSelectedForumThreadAction: forumThreadActions.getSelectedForumThreadAction,
  showDeleteDialogAction: forumThreadActions.getShowDeleteDialogAction,
  closeDeleteDialogAction: forumThreadActions.getCloseDeleteDialogAction,
  deleteForumThread: forumThreadActions.deleteForumThread,
  getForumThreads: forumThreadActions.getForumThreads,
  handleThreadTransferAction: forumMessageActions.getHandleThreadTransferAction
}, dispatch);

const ConnectedUserCard = connect(mapStateToProps, mapDispatchToProps)(UserCard);

export default ConnectedUserCard;