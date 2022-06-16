export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG';
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export function getShowLoginDialog() {
  return {
    type: SHOW_LOGIN_DIALOG
  };
}

export function getHideLoginDialog() {
  return {
    type: HIDE_LOGIN_DIALOG
  };
}

export function getLoginPending() {
  return {
    type: LOGIN_PENDING
  };
}

export function getLoginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

export function getLoginFailure() {
  return {
    type: LOGIN_FAILURE
  };
}

export function getLogout() {
  return {
    type: LOGOUT
  };
}