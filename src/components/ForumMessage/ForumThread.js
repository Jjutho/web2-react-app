import React, { Component } from 'react';
import { connect } from 'react-redux';
import ForumMessageWidget from './ForumMessageWidget';
import { Form, Modal, Button, Spinner } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import * as forumMessageActions from '../../actions/forumMessageActions';

import '../../styles/ForumThread.scss';

const mapStateToProps = state => {
  return state;
}

class ForumThread extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title : '',
      text: '',
    };
    this.handleCloseEditDialog = this.handleCloseEditDialog.bind(this);
    this.handleShowCreateForumMessageDialog = this.handleShowCreateForumMessageDialog.bind(this);
    this.handleCloseCreateForumMessageDialog = this.handleCloseCreateForumMessageDialog.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleCloseEditDialog() {
    const { closeEditDialogAction } = this.props;
    closeEditDialogAction();
  }

  handleShowCreateForumMessageDialog() {
    const { showCreateForumMessageDialogAction } = this.props;
    showCreateForumMessageDialogAction();
  }

  handleCloseCreateForumMessageDialog() {
    const { closeCreateForumMessageDialog } = this.props;
    closeCreateForumMessageDialog();
  }
  
  async handleSubmit( e, selectedForumMessage ) {
    e.preventDefault();
    const { updateForumMessageAction } = this.props;
    let token = this.props.accessToken;
    await updateForumMessageAction(selectedForumMessage, this.props.thread, token);
  }

  async handleForumMessageSubmit( e ) {
    e.preventDefault();
    let { title, text } = this.state;
    let newForumMessage = {
      title: title,
      text: text,
      authorID: this.props.user.userID,
      forumThreadID: this.props.thread,
    }
    const { createForumMessageAction } = this.props;
    let token = this.props.accessToken;
    await createForumMessageAction(newForumMessage, this.props.thread, token);
    this.handleCloseCreateForumMessageDialog();
  }

  handleOnChange(e) {
    const { name, value } = e.target;
    this.setState({ [name] : value });
  }

  canSubmit() {
    const { title, text } = this.state;
    if (title && text) {
      return true;
    } else {
      return false;
    }
  }

  render() {

    let showEditDialog = this.props.showEditDialog;
    if ( showEditDialog === undefined ) {
      showEditDialog = false;
    }

    let showCreateForumMessageDialog = this.props.showCreateForumMessageDialog;
    if ( showCreateForumMessageDialog === undefined ) {
      showCreateForumMessageDialog = false;
    }

    let forumMessageLoaded = false;
    let selectedForumMessage = this.props.selectedForumMessage;
    if (selectedForumMessage !== undefined) {
      forumMessageLoaded = true;
    }

    let updateForumMessagePending = this.props.updateForumMessagePending;
    if ( updateForumMessagePending === undefined ) {
      updateForumMessagePending = false;
    }

    let isSuccess = this.props.updateForumMessageSuccess;
    if ( isSuccess === undefined ) {
      isSuccess = false;
    }

    let isError = this.props.error;
    if ( isError === undefined ) {
      isError = false;
    }

    let createForumMessageButton;
    if (this.canSubmit()) {
      createForumMessageButton = <Button className="create-forum-message-button" id="CreateForumMessageButton" variant="primary" type="submit" onClick={e => this.handleForumMessageSubmit(e)}>comment</Button>
    } else {
      createForumMessageButton = <Button className="create-forum-message-button" id="CreateForumMessageButton" variant="primary" type="submit" onClick={e => this.handleForumMessageSubmit(e)} disabled>comment</Button>
    }

    let threadName = this.props.threadName;
    let threadDescription = this.props.threadDescription;

    return (
      <div className="page-content" id="ForumThread">
        <div className="forum-thread-heading-btn">
          <h1><span className="highlighted-text">{threadName}</span></h1>
          <Button id="OpenCreateForumMessageDialogButton" onClick={this.handleShowCreateForumMessageDialog}>+ comment</Button>
        </div>
        <p className="thread-intro">{threadDescription}</p>
        <ForumMessageWidget/>
        {/* EDIT FORUM THREAD MODAL */}
        <Modal show={showEditDialog} onHide={this.handleCloseEditDialog}>
        <Modal.Header>
          <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={this.handleCloseEditDialog}></button>
            <Modal.Title>Edit Forum Thread</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="ForumMessageTitleInput">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" defaultValue={forumMessageLoaded && selectedForumMessage.title} name="title" placeholder="Please enter a title" onChange={e => selectedForumMessage.title = e.target.value}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="ForumMessageTextInput">
                <Form.Label>Text</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Please enter your message" defaultValue={forumMessageLoaded && selectedForumMessage.text} name="text" onChange={e => selectedForumMessage.text = e.target.value}/>
              </Form.Group>
              {updateForumMessagePending && <Spinner animation="border" variant="primary" style={{marginLeft:"20px"}} />}
              {isSuccess && <Form.Label className="update-success" style={{color: "green", marginLeft:"20px"}}>Forum Thread updated.</Form.Label>}
              {isError && <Form.Label className="update-error" style={{color: "red", marginLeft:"20px"}}>Update failed.</Form.Label>}
              <div className="f-right button-container">
                <Button className="abort-button" id="CancelEditForumMessageButton" variant="secondary" onClick={this.handleCloseEditDialog}>Abort</Button>
                <Button className="save-button" id="SaveForumMessageButton" variant="primary" type="submit" onClick={e => this.handleSubmit(e, selectedForumMessage)}>Save changes</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
        {/* CREATE FORUM THREAD MODAL */}
        <Modal show={showCreateForumMessageDialog} onHide={this.handleCloseCreateForumMessageDialog}>
        <Modal.Header>
        <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={this.handleCloseCreateForumMessageDialog}></button>
            <Modal.Title>Leave a message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="ForumMessageTitleInput">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Please enter a title" name="title" onChange={this.handleOnChange}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="ForumMessageTextInput">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Please enter your message" name="text" onChange={this.handleOnChange}/>
              </Form.Group>
              <div className="f-right button-container">
                <Button className="abort-button" id="CancelCreateForumMessageButton" variant="secondary" onClick={this.handleCloseCreateForumMessageDialog}>Abort</Button>
                {createForumMessageButton}
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators ({
  closeEditDialogAction: forumMessageActions.getCloseForumMessageEditDialogAction,
  updateForumMessageAction: forumMessageActions.getUpdateForumMessageAction,
  showCreateForumMessageDialogAction: forumMessageActions.getShowCreateForumMessageDialogAction,
  closeCreateForumMessageDialog: forumMessageActions.getCloseCreateForumMessageDialogAction,
  createForumMessageAction: forumMessageActions.getCreateForumMessageAction,
}, dispatch);

const ConnectedForumThread = connect(mapStateToProps, mapDispatchToProps)(ForumThread);

export default ConnectedForumThread;