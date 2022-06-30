import { Buffer } from 'buffer';

export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG';
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export function getShowLoginDialogAction() {
  return {
    type: SHOW_LOGIN_DIALOG
  };
}

export function getHideLoginDialogAction() {
  return {
    type: HIDE_LOGIN_DIALOG
  };
}

export function getLoginPendingAction() {
  return {
    type: LOGIN_PENDING
  };
}

export function getLoginSuccessAction(userSession) {
  return {
    type: LOGIN_SUCCESS,
    user: userSession.user,
    accessToken: userSession.accessToken
  };
}

export function getLoginFailureAction() {
  return {
    type: LOGIN_FAILURE,
  };
}

export function getLogoutAction() {
  return {
    type: LOGOUT
  };
}

export function authenticateUser(userID, password) {
  return dispatch => {
    dispatch(getLoginPendingAction());
    login(userID, password)
      .then(userSession => {
        dispatch(getLoginSuccessAction(userSession));
      }, error => {
        dispatch(getLoginFailureAction(error));
      }
    ).catch(error => {dispatch(getLoginFailureAction(error));});
  }
}

function login(userID, password) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization':  'Basic '+btoa(userID+':'+password)}
  };

  return fetch('http://localhost:8080/authenticate', requestOptions)
    .then(handleResponse)
    .then(userSession => {
      return userSession;
    }).catch(error => console.log(error));
}

function handleResponse(response) {
  const authorizationHeader = response.headers.get('Authorization');
  return response.text().then(text => {

    let token;
    if (authorizationHeader) {
      token = authorizationHeader.split(' ')[1];
    }

    let unparsedData = Buffer.from(token, 'base64').toString().split('}', 2);
    unparsedData = unparsedData[1] + '}';
    const data = JSON.parse(unparsedData);
    delete data.iat;    

    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
      }
      const error = (data && data.message) || response.statusText;
      console.log(error);
      return Promise.reject(error);
    } else {
      let userSession = {
        user:data,
        accessToken: token
      };
      return userSession;
    }
  });
}

function logout() {
  console.log('Forcefully logged out.');
}