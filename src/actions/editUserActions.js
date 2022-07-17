export const CLOSE_EDIT_DIALOG = 'CLOSE_EDIT_DIALOG';
export const SHOW_EDIT_DIALOG = 'SHOW_EDIT_DIALOG';
export const GET_USERS_PENDING = 'GET_USERS_PENDING';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';
export const SELECTED_USER = 'SELECTED_USER';
export const UPDATE_USER_PENDING = 'UPDATE_USER_PENDING';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const UPDATE_USER_SUCCESS_STATUS = 'UPDATE_USER_SUCCESS_STATUS';
export const CLOSE_DELETE_DIALOG = 'CLOSE_DELETE_DIALOG';
export const SHOW_DELETE_DIALOG = 'SHOW_DELETE_DIALOG';

export const DELETE_USER_PENDING = 'DELETE_USER_PENDING';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const CREATE_USER_PENDING = 'CREATE_USER_PENDING';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const SHOW_CREATE_USER_DIALOG = 'SHOW_CREATE_USER_DIALOG';
export const CLOSE_CREATE_USER_DIALOG = 'CLOSE_CREATE_USER_DIALOG'

// EDIT USER DIALOG + SELECTED USER
export function getCloseEditDialogAction() {
  return {
    type: CLOSE_EDIT_DIALOG
  };
}
export function getShowEditDialogAction() {
  return {
    type: SHOW_EDIT_DIALOG
  };
}
export function getSelectedUserAction(user) {
  return {
    type: SELECTED_USER,
    selectedUser: user
  };
}
// CREATE USER DIALOG
export function getCloseCreateUserDialogAction() {
  return {
    type: CLOSE_CREATE_USER_DIALOG
  };
}
export function getShowCreateUserDialogAction() {
  return {
    type: SHOW_CREATE_USER_DIALOG
  };
}
// DELETE DIALOG
export function getShowDeleteDialogAction () {
  return {
    type: SHOW_DELETE_DIALOG
  }
}
export function getCloseDeleteDialogAction () {
  return {
    type: CLOSE_DELETE_DIALOG
  }
}
// GET
export function getUsersPendingAction() {
  return {
    type: GET_USERS_PENDING
  };
}
export function getUsersSuccessAction(users) {
  return {
    type: GET_USERS_SUCCESS,
    users: users
  };
}
export function getUsersFailureAction() {
  return {
    type: GET_USERS_FAILURE,
  };
}
// UPDATE
export function getUpdateUserPendingAction() {
  return {
    type: UPDATE_USER_PENDING
  };
}
export function getUpdateUserSuccessAction() {
  return {
    type: UPDATE_USER_SUCCESS
  };
}
export function getUpdateUserFailureAction() {
  return {
    type: UPDATE_USER_FAILURE
  };
}
// DELETE
export function getDeleteUserPendingAction() {
  return {
    type: DELETE_USER_PENDING
  };
}
export function getDeleteUserSuccessAction() {
  return {
    type: DELETE_USER_SUCCESS
  };
}
export function getDeleteUserFailureAction() {
  return {
    type: DELETE_USER_FAILURE
  };
}
// CREATE
export function getCreateUserPendingAction() {
  return {
    type: CREATE_USER_PENDING
  };
}
export function getCreateUserSuccessAction() {
  return {
    type: CREATE_USER_SUCCESS
  };
}
export function getCreateUserFailureAction() {
  return {
    type: CREATE_USER_FAILURE
  };
}

export function getUsers() {
  return dispatch => {
    dispatch(getUsersPendingAction());
    getUsersFromServer()
      .then(users => {
        dispatch(getUsersSuccessAction(users));
      }, error => {
        dispatch(getUsersFailureAction(error));
      }
    ).catch(error => {dispatch(getUsersFailureAction(error));});
  };
}

function getUsersFromServer () {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch('http://localhost:8080/publicUsers', requestOptions)
    .then(handleResponse)
    .then(users => {
      return users;
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

export function getUpdateUserAction(user, token) {
  return dispatch => {
    dispatch(getUpdateUserPendingAction());
    updateUser(user, token)
      .then(user => {
        dispatch(getUpdateUserSuccessAction());
      }, error => {
        dispatch(getUpdateUserFailureAction(error));
      }
      ).then(() => {
        dispatch(getUsers());
      })
      .catch(error => {dispatch(getUpdateUserFailureAction());});
  }
}

function updateUser(user, token) {
  const requestOptions = {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(user)
  };

  return fetch('http://localhost:8080/users/' + user.userID, requestOptions)
    .then(handleUpdateResponse)
    .then(user => {
      return user;
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

export function deleteUser(userID, token) {
  return dispatch => {
    dispatch(getDeleteUserPendingAction());
    deleteUserFromServer(userID, token)
      .then(msg => {
        dispatch(getDeleteUserSuccessAction());
      }, error => {
        dispatch(getDeleteUserFailureAction(error));
      }
      ).then(() => {
        dispatch(getUsers());
      })
      .catch(error => {dispatch(getDeleteUserFailureAction());});
  }
}

function deleteUserFromServer(userID, token) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };

  return fetch('http://localhost:8080/users/' + userID, requestOptions)
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

export function getCreateUserAction(user ,token) {
  return dispatch => {
    dispatch(getCreateUserPendingAction());
    createUserOnServer(user, token)
      .then(user => {
        dispatch(getCreateUserSuccessAction(user));
      }, error => {
        dispatch(getCreateUserFailureAction(error));
      }
      ).then(() => {
        dispatch(getUsers());
      })
      .catch(error => {dispatch(getCreateUserFailureAction());});
  }
}

function createUserOnServer(user, token) {
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(user)
  };

  return fetch('http://localhost:8080/users/', requestOptions)
    .then(handleCreateResponse)
    .then(user => {
      return user;
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