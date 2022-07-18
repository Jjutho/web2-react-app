import React, { Component } from 'react';
import { connect } from 'react-redux';
import ForumThreadWidget from './ForumThreadWidget';
import { Form, Modal, Button, Spinner } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import * as forumThreadActions from '../actions/forumThreadActions';

import '../styles/ForumThreadOverview.scss';

const mapStateToProps = state => {
  return state;
}

class ForumThreadOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name : '',
      description: '',
    };
    this.handleCloseEditDialog = this.handleCloseEditDialog.bind(this);
    this.handleShowCreateForumThreadDialog = this.handleShowCreateForumThreadDialog.bind(this);
    this.handleCloseCreateForumThreadDialog = this.handleCloseCreateForumThreadDialog.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleCloseEditDialog() {
    const { closeEditDialogAction } = this.props;
    closeEditDialogAction();
  }

  handleShowCreateForumThreadDialog() {
    const { showCreateForumThreadDialogAction } = this.props;
    showCreateForumThreadDialogAction();
  }

  handleCloseCreateForumThreadDialog() {
    const { closeCreateForumThreadDialog } = this.props;
    closeCreateForumThreadDialog();
  }
  
  async handleSubmit( e, selectedForumThread ) {
    e.preventDefault();
    const { updateForumThreadAction } = this.props;
    let token = this.props.accessToken;
    await updateForumThreadAction(selectedForumThread, token);
  }

  async handleForumThreadSubmit( e ) {
    e.preventDefault();
    let { name, description } = this.state;
    let newForumThread = {
      name: name,
      description: description,
      ownerID: this.props.user.userID,
    }
    const { createForumThreadAction } = this.props;
    let token = this.props.accessToken;
    await createForumThreadAction(newForumThread, token);
    this.handleCloseCreateForumThreadDialog();
  }

  handleOnChange(e) {
    const { name, value } = e.target;
    this.setState({ [name] : value });
  }

  canSubmit() {
    const { name, description } = this.state;
    if (name && description) {
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

    let showCreateForumThreadDialog = this.props.showCreateForumThreadDialog;
    if ( showCreateForumThreadDialog === undefined ) {
      showCreateForumThreadDialog = false;
    }

    let forumThreadLoaded = false;
    let selectedForumThread = this.props.selectedForumThread;
    if (selectedForumThread !== undefined) {
      forumThreadLoaded = true;
    }

    let updateForumThreadPending = this.props.updateForumThreadPending;
    if ( updateForumThreadPending === undefined ) {
      updateForumThreadPending = false;
    }

    let isSuccess = this.props.updateForumThreadSuccess;
    if ( isSuccess === undefined ) {
      isSuccess = false;
    }

    let isError = this.props.error;
    if ( isError === undefined ) {
      isError = false;
    }

    let createForumThreadButton;
    if (this.canSubmit()) {
      createForumThreadButton = <Button className="create-forum-thread-button" id="CreateForumThreadButton" variant="primary" type="submit" onClick={e => this.handleForumThreadSubmit(e)}>Create thread</Button>
    } else {
      createForumThreadButton = <Button className="create-forum-thread-button" id="CreateForumThreadButton" variant="primary" type="submit" onClick={e => this.handleForumThreadSubmit(e)} disabled>Create thread</Button>
    }

    return (
      <div className="page-content" id="ForumThreadOverview">
        <div className="forum-thread-overview-heading-btn">
          <h1>Forum Threads</h1>
          <Button id="OpenCreateForumThreadDialogButton" onClick={this.handleShowCreateForumThreadDialog}>+ create Thread</Button>
        </div>
        <ForumThreadWidget/>
        {/* EDIT FORUM THREAD MODAL */}
        <Modal show={showEditDialog} onHide={this.handleCloseEditDialog}>
        <Modal.Header>
          <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={this.handleCloseEditDialog}></button>
            <Modal.Title>Edit Forum Thread</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="ForumThreadNameInput">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" defaultValue={forumThreadLoaded && selectedForumThread.name} name="name" placeholder="Please enter a topic" onChange={e => selectedForumThread.name = e.target.value}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="ForumThreadDescriptionInput">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Please enter a short description" defaultValue={forumThreadLoaded && selectedForumThread.description} name="description" onChange={e => selectedForumThread.description = e.target.value}/>
              </Form.Group>
              {updateForumThreadPending && <Spinner animation="border" variant="primary" style={{marginLeft:"20px"}} />}
              {isSuccess && <Form.Label className="update-success" style={{color: "green", marginLeft:"20px"}}>Forum Thread updated.</Form.Label>}
              {isError && <Form.Label className="update-error" style={{color: "red", marginLeft:"20px"}}>Update failed.</Form.Label>}
              <div className="f-right button-container">
                <Button className="abort-button" id="CancelEditForumThreadButton" variant="secondary" onClick={this.handleCloseEditDialog}>Abort</Button>
                <Button className="save-button" id="SaveForumThreadButton" variant="primary" type="submit" onClick={e => this.handleSubmit(e, selectedForumThread)}>Save changes</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
        {/* CREATE FORUM THREAD MODAL */}
        <Modal show={showCreateForumThreadDialog} onHide={this.handleCloseCreateForumThreadDialog}>
        <Modal.Header>
        <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={this.handleCloseCreateForumThreadDialog}></button>
            <Modal.Title>Create a new thread</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="ForumThreadNameInput">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Please enter a topic" name="name" onChange={this.handleOnChange}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="ForumThreadDescriptionInput">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Please enter a short description" name="description" onChange={this.handleOnChange}/>
              </Form.Group>
              <div className="f-right button-container">
                <Button className="abort-button" id="CancelCreateForumThreadButton" variant="secondary" onClick={this.handleCloseCreateForumThreadDialog}>Abort</Button>
                {createForumThreadButton}
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators ({
  closeEditDialogAction: forumThreadActions.getCloseForumThreadEditDialogAction,
  updateForumThreadAction: forumThreadActions.getUpdateForumThreadAction,
  showCreateForumThreadDialogAction: forumThreadActions.getShowCreateForumThreadDialogAction,
  closeCreateForumThreadDialog: forumThreadActions.getCloseCreateForumThreadDialogAction,
  createForumThreadAction: forumThreadActions.getCreateForumThreadAction,
}, dispatch);

const ConnectedForumThreadOverview = connect(mapStateToProps, mapDispatchToProps)(ForumThreadOverview);

export default ConnectedForumThreadOverview;