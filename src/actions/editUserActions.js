import { Buffer } from 'buffer';

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
export const UPDATE_USER_DONE = 'UPDATE_USER_DONE'

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
export function getUpdateUserPendingAction() {
  return {
    type: UPDATE_USER_PENDING
  };
}
export function getUpdateUserSuccessAction(user) {
  return {
    type: UPDATE_USER_SUCCESS,
    updatedUser: user
  };
}
export function getUpdateUserFailureAction() {
  return {
    type: UPDATE_USER_FAILURE,
  };
}
export function getUpdateUserDone() {
  return {
    type: UPDATE_USER_DONE,
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
        dispatch(getUpdateUserSuccessAction(user));
      }, error => {
        dispatch(getUpdateUserFailureAction(error));
      }
      ).catch(error => {dispatch(getUpdateUserFailureAction());});
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