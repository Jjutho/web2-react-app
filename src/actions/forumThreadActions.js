export const CLOSE_FORUM_THREAD_EDIT_DIALOG = 'CLOSE_FORUM_THREAD_EDIT_DIALOG';
export const SHOW_FORUM_THREAD_EDIT_DIALOG = 'SHOW_FORUM_THREAD_EDIT_DIALOG';
export const GET_FORUM_THREADS_PENDING = 'GET_FORUM_THREADS_PENDING';
export const GET_FORUM_THREADS_SUCCESS = 'GET_FORUM_THREADS_SUCCESS';
export const GET_FORUM_THREADS_FAILURE = 'GET_FORUM_THREADS_FAILURE';
export const SELECTED_FORUM_THREAD = 'SELECTED_FORUM_THREAD';
export const UPDATE_FORUM_THREAD_PENDING = 'UPDATE_FORUM_THREAD_PENDING';
export const UPDATE_FORUM_THREAD_SUCCESS = 'UPDATE_FORUM_THREAD_SUCCESS';
export const UPDATE_FORUM_THREAD_FAILURE = 'UPDATE_FORUM_THREAD_FAILURE';
export const UPDATE_FORUM_THREAD_SUCCESS_STATUS = 'UPDATE_FORUM_THREAD_SUCCESS_STATUS';
export const CLOSE_FORUM_THREAD_DELETE_DIALOG = 'CLOSE_FORUM_THREAD_DELETE_DIALOG';
export const SHOW_FORUM_THREAD_DELETE_DIALOG = 'SHOW_FORUM_THREAD_DELETE_DIALOG';

export const DELETE_FORUM_THREAD_PENDING = 'DELETE_FORUM_THREAD_PENDING';
export const DELETE_FORUM_THREAD_SUCCESS = 'DELETE_FORUM_THREAD_SUCCESS';
export const DELETE_FORUM_THREAD_FAILURE = 'DELETE_FORUM_THREAD_FAILURE';

export const CREATE_FORUM_THREAD_PENDING = 'CREATE_FORUM_THREAD_PENDING';
export const CREATE_FORUM_THREAD_SUCCESS = 'CREATE_FORUM_THREAD_SUCCESS';
export const CREATE_FORUM_THREAD_FAILURE = 'CREATE_FORUM_THREAD_FAILURE';

export const SHOW_CREATE_FORUM_THREAD_DIALOG = 'SHOW_CREATE_FORUM_THREAD_DIALOG';
export const CLOSE_CREATE_FORUM_THREAD_DIALOG = 'CLOSE_CREATE_FORUM_THREAD_DIALOG'

// EDIT FORUM THREAD DIALOG + SELECTED FORUM_THREAD
export function getCloseForumThreadEditDialogAction() {
  return {
    type: CLOSE_FORUM_THREAD_EDIT_DIALOG
  };
}
export function getShowForumThreadEditDialogAction() {
  return {
    type: SHOW_FORUM_THREAD_EDIT_DIALOG
  };
}
export function getSelectedForumThreadAction(thread) {
  return {
    type: SELECTED_FORUM_THREAD,
    selectedForumThread: thread
  };
}
// CREATE FORUM_THREAD DIALOG
export function getCloseCreateForumThreadDialogAction() {
  return {
    type: CLOSE_CREATE_FORUM_THREAD_DIALOG
  };
}
export function getShowCreateForumThreadDialogAction() {
  return {
    type: SHOW_CREATE_FORUM_THREAD_DIALOG
  };
}
// DELETE DIALOG
export function getShowDeleteDialogAction () {
  return {
    type: SHOW_FORUM_THREAD_DELETE_DIALOG
  }
}
export function getCloseDeleteDialogAction () {
  return {
    type: CLOSE_FORUM_THREAD_DELETE_DIALOG
  }
}
// GET
export function getForumThreadsPendingAction() {
  return {
    type: GET_FORUM_THREADS_PENDING
  };
}
export function getForumThreadsSuccessAction(threads) {
  return {
    type: GET_FORUM_THREADS_SUCCESS,
    threads: threads
  };
}
export function getForumThreadsFailureAction() {
  return {
    type: GET_FORUM_THREADS_FAILURE,
  };
}
// UPDATE
export function getUpdateForumThreadPendingAction() {
  return {
    type: UPDATE_FORUM_THREAD_PENDING
  };
}
export function getUpdateForumThreadSuccessAction() {
  return {
    type: UPDATE_FORUM_THREAD_SUCCESS
  };
}
export function getUpdateForumThreadFailureAction() {
  return {
    type: UPDATE_FORUM_THREAD_FAILURE
  };
}
// DELETE
export function getDeleteForumThreadPendingAction() {
  return {
    type: DELETE_FORUM_THREAD_PENDING
  };
}
export function getDeleteForumThreadSuccessAction() {
  return {
    type: DELETE_FORUM_THREAD_SUCCESS
  };
}
export function getDeleteForumThreadFailureAction() {
  return {
    type: DELETE_FORUM_THREAD_FAILURE
  };
}
// CREATE
export function getCreateForumThreadPendingAction() {
  return {
    type: CREATE_FORUM_THREAD_PENDING
  };
}
export function getCreateForumThreadSuccessAction() {
  return {
    type: CREATE_FORUM_THREAD_SUCCESS
  };
}
export function getCreateForumThreadFailureAction() {
  return {
    type: CREATE_FORUM_THREAD_FAILURE
  };
}

export function getForumThreads() {
  return dispatch => {
    dispatch(getForumThreadsPendingAction());
    getForumThreadsFromServer()
      .then(threads => {
        dispatch(getForumThreadsSuccessAction(threads));
      }, error => {
        dispatch(getForumThreadsFailureAction(error));
      }
    ).catch(error => {dispatch(getForumThreadsFailureAction(error));});
  };
}

function getForumThreadsFromServer () {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch('http://localhost:8080/forumThreads', requestOptions)
    .then(handleResponse)
    .then(threads => {
      return threads;
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

export function getUpdateForumThreadAction(thread, token) {
  return dispatch => {
    dispatch(getUpdateForumThreadPendingAction());
    updateForumThread(thread, token)
      .then(thread => {
        dispatch(getUpdateForumThreadSuccessAction());
      }, error => {
        dispatch(getUpdateForumThreadFailureAction(error));
      }
      ).then(() => {
        dispatch(getForumThreads());
      })
      .catch(error => {dispatch(getUpdateForumThreadFailureAction());});
  }
}

function updateForumThread(thread, token) {
  const requestOptions = {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(thread)
  };

  return fetch('http://localhost:8080/forumThreads/' + thread._id, requestOptions)
    .then(handleUpdateResponse)
    .then(thread => {
      return thread;
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

export function deleteForumThread(threadID, token) {
  return dispatch => {
    dispatch(getDeleteForumThreadPendingAction());
    deleteForumThreadFromServer(threadID, token)
      .then(msg => {
        dispatch(getDeleteForumThreadSuccessAction());
      }, error => {
        dispatch(getDeleteForumThreadFailureAction(error));
      }
      ).then(() => {
        dispatch(getForumThreads());
      })
      .catch(error => {dispatch(getDeleteForumThreadFailureAction());});
  }
}

function deleteForumThreadFromServer(threadID, token) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };

  return fetch('http://localhost:8080/forumThreads/' + threadID, requestOptions)
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

export function getCreateForumThreadAction(thread ,token) {
  return dispatch => {
    dispatch(getCreateForumThreadPendingAction());
    createForumThreadOnServer(thread, token)
      .then(thread => {
        dispatch(getCreateForumThreadSuccessAction(thread));
      }, error => {
        dispatch(getCreateForumThreadFailureAction(error));
      }
      ).then(() => {
        dispatch(getForumThreads());
      })
      .catch(error => {dispatch(getCreateForumThreadFailureAction());});
  }
}

function createForumThreadOnServer(thread, token) {
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(thread)
  };

  return fetch('http://localhost:8080/forumThreads/', requestOptions)
    .then(handleCreateResponse)
    .then(thread => {
      return thread;
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