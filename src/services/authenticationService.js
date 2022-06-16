function authenticateUser(userID, password) {
  return dispatch => {
    dispatch(getAuthenticateUserPending());
    login(userID, password)
      .then(userSession => {
        dispatch(getAuthenticationSuccess(userSession));
      }, error => {
        dispatch(getAuthenticationError(error));
      }
    ).catch(error => {dispatch(getAuthenticationError(error));});
  }
}

function login(userID, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userID, password })
  };

  return fetch('https://localhost:8080/authenticate', requestOptions)
    .then(handleResponse)
    .then(userSession => {
      return userSession;
    });
}