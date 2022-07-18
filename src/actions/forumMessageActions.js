export const CLOSE_FORUM_MESSAGE_EDIT_DIALOG = 'CLOSE_FORUM_MESSAGE_EDIT_DIALOG';
export const SHOW_FORUM_MESSAGE_EDIT_DIALOG = 'SHOW_FORUM_MESSAGE_EDIT_DIALOG';
export const GET_FORUM_MESSAGES_PENDING = 'GET_FORUM_MESSAGES_PENDING';
export const GET_FORUM_MESSAGES_SUCCESS = 'GET_FORUM_MESSAGES_SUCCESS';
export const GET_FORUM_MESSAGES_FAILURE = 'GET_FORUM_MESSAGES_FAILURE';
export const SELECTED_FORUM_MESSAGE = 'SELECTED_FORUM_MESSAGE';
export const UPDATE_FORUM_MESSAGE_PENDING = 'UPDATE_FORUM_MESSAGE_PENDING';
export const UPDATE_FORUM_MESSAGE_SUCCESS = 'UPDATE_FORUM_MESSAGE_SUCCESS';
export const UPDATE_FORUM_MESSAGE_FAILURE = 'UPDATE_FORUM_MESSAGE_FAILURE';
export const UPDATE_FORUM_MESSAGE_SUCCESS_STATUS = 'UPDATE_FORUM_MESSAGE_SUCCESS_STATUS';
export const CLOSE_FORUM_MESSAGE_DELETE_DIALOG = 'CLOSE_FORUM_MESSAGE_DELETE_DIALOG';
export const SHOW_FORUM_MESSAGE_DELETE_DIALOG = 'SHOW_FORUM_MESSAGE_DELETE_DIALOG';

export const DELETE_FORUM_MESSAGE_PENDING = 'DELETE_FORUM_MESSAGE_PENDING';
export const DELETE_FORUM_MESSAGE_SUCCESS = 'DELETE_FORUM_MESSAGE_SUCCESS';
export const DELETE_FORUM_MESSAGE_FAILURE = 'DELETE_FORUM_MESSAGE_FAILURE';

export const CREATE_FORUM_MESSAGE_PENDING = 'CREATE_FORUM_MESSAGE_PENDING';
export const CREATE_FORUM_MESSAGE_SUCCESS = 'CREATE_FORUM_MESSAGE_SUCCESS';
export const CREATE_FORUM_MESSAGE_FAILURE = 'CREATE_FORUM_MESSAGE_FAILURE';

export const SHOW_CREATE_FORUM_MESSAGE_DIALOG = 'SHOW_CREATE_FORUM_MESSAGE_DIALOG';
export const CLOSE_CREATE_FORUM_MESSAGE_DIALOG = 'CLOSE_CREATE_FORUM_MESSAGE_DIALOG';

export const HANDLE_THREAD_TRANSFER = 'HANDLE_THREAD_TRANSFER';

// EDIT FORUM THREAD DIALOG + SELECTED FORUM_MESSAGE
export function getCloseForumMessageEditDialogAction() {
  return {
    type: CLOSE_FORUM_MESSAGE_EDIT_DIALOG
  };
}
export function getShowForumMessageEditDialogAction() {
  return {
    type: SHOW_FORUM_MESSAGE_EDIT_DIALOG
  };
}
export function getSelectedForumMessageAction(message) {
  return {
    type: SELECTED_FORUM_MESSAGE,
    selectedForumMessage: message
  };
}
// CREATE FORUM_MESSAGE DIALOG
export function getCloseCreateForumMessageDialogAction() {
  return {
    type: CLOSE_CREATE_FORUM_MESSAGE_DIALOG
  };
}
export function getShowCreateForumMessageDialogAction() {
  return {
    type: SHOW_CREATE_FORUM_MESSAGE_DIALOG
  };
}
// DELETE DIALOG
export function getShowDeleteDialogAction () {
  return {
    type: SHOW_FORUM_MESSAGE_DELETE_DIALOG
  }
}
export function getCloseDeleteDialogAction () {
  return {
    type: CLOSE_FORUM_MESSAGE_DELETE_DIALOG
  }
}
// GET
export function getForumMessagesPendingAction() {
  return {
    type: GET_FORUM_MESSAGES_PENDING
  };
}
export function getForumMessagesSuccessAction(messages) {
  return {
    type: GET_FORUM_MESSAGES_SUCCESS,
    messages: messages
  };
}
export function getForumMessagesFailureAction() {
  return {
    type: GET_FORUM_MESSAGES_FAILURE,
  };
}
// UPDATE
export function getUpdateForumMessagePendingAction() {
  return {
    type: UPDATE_FORUM_MESSAGE_PENDING
  };
}
export function getUpdateForumMessageSuccessAction() {
  return {
    type: UPDATE_FORUM_MESSAGE_SUCCESS
  };
}
export function getUpdateForumMessageFailureAction() {
  return {
    type: UPDATE_FORUM_MESSAGE_FAILURE
  };
}
// DELETE
export function getDeleteForumMessagePendingAction() {
  return {
    type: DELETE_FORUM_MESSAGE_PENDING
  };
}
export function getDeleteForumMessageSuccessAction() {
  return {
    type: DELETE_FORUM_MESSAGE_SUCCESS
  };
}
export function getDeleteForumMessageFailureAction() {
  return {
    type: DELETE_FORUM_MESSAGE_FAILURE
  };
}
// CREATE
export function getCreateForumMessagePendingAction() {
  return {
    type: CREATE_FORUM_MESSAGE_PENDING
  };
}
export function getCreateForumMessageSuccessAction() {
  return {
    type: CREATE_FORUM_MESSAGE_SUCCESS
  };
}
export function getCreateForumMessageFailureAction() {
  return {
    type: CREATE_FORUM_MESSAGE_FAILURE
  };
}
export function getHandleThreadTransferAction(thread, name, description) {
  return {
    type: HANDLE_THREAD_TRANSFER,
    thread: thread,
    threadName: name,
    threadDescription: description
  };
}

export function getForumMessages(threadID) {
  return dispatch => {
    dispatch(getForumMessagesPendingAction());
    getForumMessagesFromServer(threadID)
      .then(messages => {
        dispatch(getForumMessagesSuccessAction(messages));
      }, error => {
        dispatch(getForumMessagesFailureAction(error));
      }
    ).catch(error => {dispatch(getForumMessagesFailureAction(error));});
  };
}

function getForumMessagesFromServer (threadID) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch('http://localhost:8080/forumThreads/'+threadID+'/forumMessages', requestOptions)
    .then(handleResponse)
    .then(messages => {
      return messages;
    }).catch(error => console.log(error));
}

function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    } else {
      return data;
    }
  });
}

export function getUpdateForumMessageAction(message, threadID, token) {
  return dispatch => {
    dispatch(getUpdateForumMessagePendingAction());
    updateForumMessage(message, token)
      .then(message => {
        dispatch(getUpdateForumMessageSuccessAction());
      }, error => {
        dispatch(getUpdateForumMessageFailureAction(error));
      }
      ).then(() => {
        dispatch(getForumMessages(threadID));
      })
      .catch(error => {dispatch(getUpdateForumMessageFailureAction());});
  }
}

function updateForumMessage(message, token) {
  const requestOptions = {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(message)
  };

  return fetch('http://localhost:8080/forumMessages/' + message._id, requestOptions)
    .then(handleUpdateResponse)
    .then(message => {
      return message;
    }).catch(error => console.log(error));
}

function handleUpdateResponse (response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        return Promise.reject('Unauthorized');
      }
      return Promise.reject('Error');
    } else {
      return Promise.resolve(data);
    }
  });
}

export function deleteForumMessage(messageID, threadID, token) {
  return dispatch => {
    dispatch(getDeleteForumMessagePendingAction());
    deleteForumMessageFromServer(messageID, token)
      .then(msg => {
        dispatch(getDeleteForumMessageSuccessAction());
      }, error => {
        dispatch(getDeleteForumMessageFailureAction(error));
      }
      ).then(() => {
        dispatch(getForumMessages(threadID));
      })
      .catch(error => {dispatch(getDeleteForumMessageFailureAction());});
  }
}

function deleteForumMessageFromServer(messageID, token) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };

  return fetch('http://localhost:8080/forumMessages/' + messageID, requestOptions)
    .then(handleDeleteResponse)
    .then(msg => {
      return msg;
    }).catch(error => console.log(error));
}

function handleDeleteResponse(response) {
  return response.text().then(() => {
    if (!response.ok) {
      if (response.status === 401) {
        return Promise.reject('Unauthorized');
      }
      return Promise.reject('Error');
    } else {
      return Promise.resolve();
    }
  });
}

export function getCreateForumMessageAction(message, threadID, token) {
  return dispatch => {
    dispatch(getCreateForumMessagePendingAction());
    createForumMessageOnServer(message, token)
      .then(message => {
        dispatch(getCreateForumMessageSuccessAction(message));
      }, error => {
        dispatch(getCreateForumMessageFailureAction(error));
      }
      ).then(() => {
        dispatch(getForumMessages(threadID));
      })
      .catch(error => {dispatch(getCreateForumMessageFailureAction());});
  }
}

function createForumMessageOnServer(message, token) {
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(message)
  };

  return fetch('http://localhost:8080/forumMessages/', requestOptions)
    .then(handleCreateResponse)
    .then(message => {
      return message;
    }).catch(error => console.log(error));
}

function handleCreateResponse (response) {
  return response.text().then(() => {
    if (!response.ok) {
      if (response.status === 401) {
        return Promise.reject('Unauthorized');
      }
      return Promise.reject('Error');
    } else {
      return Promise.resolve();
    }
  });
}